"""Kwork adapter: pykwork (optional) + cookie session GET /get_manage_orders fallback.

Honest limits:
- No public Kwork API for third-party sellers.
- pykwork talks to unofficial mobile endpoints (ToS risk; credentials are the seller's).
- Cookie session is the proven path used by scripts/lib/kwork-session.mjs.
- Only the authenticated seller account is accessed — never other users' private data.
"""

from __future__ import annotations

import logging
import re
from typing import Any
from urllib.parse import urlencode

import httpx

from lead_radar.config import Settings, get_settings
from lead_radar.models import Lead
from lead_radar.retry import with_retry

log = logging.getLogger(__name__)

ORIGIN = "https://kwork.ru"


class KworkSessionExpired(RuntimeError):
    """Raised when cookies/login no longer authenticate the seller."""


def _decode_cookie_value(value: str) -> str:
    try:
        from urllib.parse import unquote

        return unquote(value)
    except Exception:
        return value.replace("%24", "$").replace("%2F", "/")


def parse_cookie_header(raw: str, *, keep_analytics: bool = False) -> str:
    text = (raw or "").strip()
    if not text:
        return ""
    if "\n" in text:
        parts: list[str] = []
        for line in text.splitlines():
            t = line.strip()
            if not t or t.startswith("#"):
                continue
            if "=" in t and ";" not in t:
                parts.append(t)
            else:
                parts.extend(p.strip() for p in t.split(";") if p.strip())
    else:
        parts = [p.strip() for p in text.split(";") if p.strip()]

    mapped: dict[str, str] = {}
    for part in parts:
        eq = part.find("=")
        if eq <= 0:
            continue
        name = part[:eq].strip()
        value = _decode_cookie_value(part[eq + 1 :].strip())
        if not name:
            continue
        if not keep_analytics and (name.startswith("_ym_") or name == "VID"):
            continue
        mapped[name] = value
    return "; ".join(f"{k}={v}" for k, v in mapped.items())


def load_kwork_cookie(settings: Settings) -> str:
    path = settings.resolve_cookies_path()
    if path and path.is_file():
        parsed = parse_cookie_header(path.read_text(encoding="utf-8"))
        if parsed:
            return parsed
    if settings.kwork_cookie.strip():
        return parse_cookie_header(settings.kwork_cookie)
    return ""


def csrf_from_cookie(cookie: str) -> str:
    m = re.search(r"(?:^|;\s*)csrf_user_token=([^;]+)", cookie or "")
    return _decode_cookie_value(m.group(1)) if m else ""


def user_id_from_cookie(cookie: str) -> str:
    m = re.search(r"(?:^|;\s*)userId=([^;]+)", cookie or "")
    return m.group(1).strip() if m else ""


class KworkSessionClient:
    def __init__(self, settings: Settings):
        self.settings = settings
        self.cookie = load_kwork_cookie(settings)
        if not self.cookie:
            raise KworkSessionExpired(
                "Нет KWORK_COOKIE / KWORK_COOKIES_FILE. "
                "Сохраните cookies продавца локально (mode 0600), не коммитьте."
            )
        self.csrf = csrf_from_cookie(self.cookie)
        self.user_id = user_id_from_cookie(self.cookie)
        self.user_agent = settings.kwork_user_agent

    def _headers(self, *, referer: str | None = None, accept: str = "application/json, text/plain, */*") -> dict[str, str]:
        return {
            "User-Agent": self.user_agent,
            "Cookie": self.cookie,
            "Referer": referer or f"{ORIGIN}/",
            "Origin": ORIGIN,
            "Accept": accept,
            "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
            "X-Requested-With": "XMLHttpRequest",
            "x-csrf-token": self.csrf,
        }

    def fetch(self, url: str, *, referer: str | None = None, accept: str | None = None) -> httpx.Response:
        headers = self._headers(
            referer=referer,
            accept=accept or "application/json, text/plain, */*",
        )

        def _do() -> httpx.Response:
            with httpx.Client(timeout=30.0, follow_redirects=False) as http:
                return http.get(url, headers=headers)

        return with_retry(
            _do,
            max_retries=self.settings.http_max_retries,
            backoff_base=self.settings.http_backoff_base,
            retry_on=(httpx.TransportError,),
            label="kwork.session",
        )

    def probe_auth(self) -> dict[str, Any]:
        res = self.fetch(
            f"{ORIGIN}/seller",
            referer=f"{ORIGIN}/",
            accept="text/html,*/*",
        )
        html = res.text or ""
        is_login = bool(re.search(r'action=["\']/login|id=["\']login-form|name=["\']login["\']', html, re.I))
        authenticated = (
            res.status_code == 200
            and not is_login
            and (
                bool(self.user_id and self.user_id in html)
                or bool(re.search(r'actorType\s*=\s*["\']worker["\']', html, re.I))
                or "pasha_stasinski" in html.lower()
            )
        )
        return {
            "authenticated": authenticated,
            "userId": self.user_id,
            "sellerStatus": res.status_code,
            "isLoginPage": is_login,
        }

    def normalize_order(self, raw: dict[str, Any]) -> Lead | None:
        user = raw.get("user") if isinstance(raw.get("user"), dict) else {}
        order_id = str(raw.get("id") or raw.get("order_id") or "").strip()
        if not order_id:
            return None
        title = str(raw.get("title") or raw.get("gtitle") or "Заказ Kwork").strip()
        buyer_username = str(user.get("login") or user.get("username") or "").strip()
        buyer_name = str(
            user.get("name") or user.get("fullname") or buyer_username or "Покупатель Kwork"
        ).strip()
        budget = ""
        if raw.get("price") is not None:
            budget = str(raw["price"])
        elif raw.get("fullPrice") is not None:
            budget = str(raw["fullPrice"])
        status = str(
            raw.get("status") or raw.get("orderStatus") or raw.get("orderVirtualStatus") or "unknown"
        )
        return Lead(
            external_id=order_id,
            source="kwork",
            title=title,
            contact_name=buyer_name,
            contact_username=buyer_username,
            budget=budget,
            status=status,
            url=f"{ORIGIN}/tracker/view?id={order_id}",
            notes=str(raw.get("note") or ""),
            raw=raw,
        )

    def fetch_manage_orders(self, statuses: list[str] | None = None, max_pages: int = 20) -> list[Lead]:
        statuses = statuses or ["all"]
        by_id: dict[str, Lead] = {}
        for status in statuses:
            orders_count = 0
            for page in range(1, max_pages + 1):
                qs = urlencode({"page": page, "s": status, "b": "date", "a": "desc"})
                url = f"{ORIGIN}/get_manage_orders?{qs}"
                res = self.fetch(url, referer=f"{ORIGIN}/manage_orders")
                text = res.text or ""
                if "Технические работы" in text:
                    raise RuntimeError(
                        f"get_manage_orders: технические работы (status={res.status_code})"
                    )
                try:
                    data = res.json()
                except Exception as exc:
                    if re.search(r'action=["\']/login|login-form', text, re.I):
                        raise KworkSessionExpired(
                            "Сессия Kwork истекла (login page на get_manage_orders). Обновите cookies."
                        ) from exc
                    raise RuntimeError(
                        f"get_manage_orders non-JSON status={res.status_code} size={len(text)}"
                    ) from exc
                if not data.get("success"):
                    raise KworkSessionExpired(
                        f"get_manage_orders success=false status={res.status_code} — вероятно сессия истекла"
                    )
                payload = data.get("data") or {}
                rows = payload.get("orderListData") or []
                if not isinstance(rows, list):
                    rows = []
                orders_count = int(payload.get("ordersCount") or orders_count or 0)
                page_limit = int(payload.get("page_limit") or 10)
                for item in rows:
                    if not isinstance(item, dict):
                        continue
                    lead = self.normalize_order(item)
                    if lead:
                        by_id[lead.external_id] = lead
                if not rows:
                    break
                if page * page_limit >= orders_count:
                    break
            log.info(
                "Kwork manage_orders status=%s unique_so_far=%s ordersCount=%s",
                status,
                len(by_id),
                orders_count,
            )
        return list(by_id.values())


def _fetch_via_pykwork(settings: Settings) -> list[Lead]:
    """Optional unofficial mobile API (login/password). Returns worker exchange projects if available."""
    try:
        from pykwork import KworkSyncClient
        from pykwork import KworkAuthError, KworkAPIError
    except ImportError as exc:
        raise RuntimeError("pykwork не установлен (pip install pykwork)") from exc

    if not settings.kwork_login or not settings.kwork_password:
        raise RuntimeError("Для pykwork задайте KWORK_LOGIN и KWORK_PASSWORD")

    client = KworkSyncClient(settings.kwork_login, settings.kwork_password)
    try:
        client.login()
    except (KworkAuthError, KworkAPIError) as exc:
        raise KworkSessionExpired(f"pykwork login failed: {exc}") from exc

    leads: list[Lead] = []
    # Exchange projects for worker (public board filtered for seller — still own session)
    try:
        projects = client.get_worker_projects()  # type: ignore[attr-defined]
    except Exception as exc:
        log.warning("pykwork get_worker_projects failed: %s", exc)
        projects = None

    rows: list[Any] = []
    if isinstance(projects, dict):
        rows = (
            projects.get("response")
            or projects.get("data")
            or projects.get("wants")
            or projects.get("projects")
            or []
        )
        if isinstance(rows, dict):
            rows = rows.get("list") or rows.get("items") or []
    elif isinstance(projects, list):
        rows = projects

    for raw in rows if isinstance(rows, list) else []:
        if not isinstance(raw, dict):
            continue
        ext = str(raw.get("id") or raw.get("want_id") or raw.get("project_id") or "").strip()
        if not ext:
            continue
        title = str(raw.get("name") or raw.get("title") or raw.get("description") or "Проект Kwork")[
            :200
        ]
        leads.append(
            Lead(
                external_id=f"want-{ext}",
                source="kwork",
                title=title,
                contact_name=str((raw.get("user") or {}).get("username") or ""),
                budget=str(raw.get("priceLimit") or raw.get("price") or ""),
                status=str(raw.get("status") or "want"),
                url=f"{ORIGIN}/projects/{ext}" if ext.isdigit() else "",
                notes="via pykwork get_worker_projects",
                raw=raw,
            )
        )
    log.info("pykwork returned %s project leads", len(leads))
    return leads


class KworkSource:
    name = "kwork"

    def __init__(self, settings: Settings | None = None):
        self.settings = settings or get_settings()

    def fetch_leads(self) -> list[Lead]:
        backend = self.settings.kwork_backend
        errors: list[str] = []

        if backend in ("auto", "pykwork") and self.settings.kwork_login and self.settings.kwork_password:
            try:
                leads = _fetch_via_pykwork(self.settings)
                if leads or backend == "pykwork":
                    return leads
                log.info("pykwork returned 0 leads — falling back to cookie session")
            except Exception as exc:
                errors.append(f"pykwork: {exc}")
                log.warning("pykwork path failed: %s", exc)
                if backend == "pykwork":
                    raise

        if backend in ("auto", "session"):
            session = KworkSessionClient(self.settings)
            auth = session.probe_auth()
            if not auth.get("authenticated"):
                raise KworkSessionExpired(
                    "Сессия Kwork не авторизована (редирект на login / нет userId в /seller). "
                    "Обновите KWORK_COOKIE. Fallback: Telegram/email alert."
                )
            log.info(
                "Kwork session OK userId=%s seller=%s",
                auth.get("userId"),
                auth.get("sellerStatus"),
            )
            statuses = [
                s.strip()
                for s in self.settings.kwork_pull_statuses.split(",")
                if s.strip()
            ] or ["all"]
            return session.fetch_manage_orders(statuses=statuses)

        raise RuntimeError(
            "Не удалось получить лиды Kwork. "
            + ("; ".join(errors) if errors else "Задайте cookies или KWORK_LOGIN/PASSWORD.")
        )
