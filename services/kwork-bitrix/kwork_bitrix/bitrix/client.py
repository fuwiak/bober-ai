"""Bitrix24 REST client (incoming webhook or OAuth access token)."""

from __future__ import annotations

import logging
from typing import Any

import httpx

from kwork_bitrix.config import Settings
from kwork_bitrix.retry import with_retry

log = logging.getLogger(__name__)


class BitrixError(RuntimeError):
    def __init__(
        self,
        method: str,
        code: str,
        description: str,
        body: dict | None = None,
    ):
        super().__init__(f"{method}: {description or code}")
        self.method = method
        self.code = code
        self.description = description
        self.body = body or {}


class _NoRetry(Exception):
    def __init__(self, err: BitrixError):
        self.err = err
        super().__init__(str(err))


class BitrixClient:
    def __init__(
        self,
        base_url: str,
        *,
        max_retries: int = 3,
        backoff_base: float = 0.8,
        timeout: float = 30.0,
    ):
        self.base_url = base_url.rstrip("/") + "/"
        self.max_retries = max_retries
        self.backoff_base = backoff_base
        self.timeout = timeout
        self._auth: str | None = None

    @classmethod
    def from_settings(cls, settings: Settings) -> BitrixClient:
        if settings.bitrix_webhook_url.strip():
            return cls(
                settings.bitrix_webhook_url.strip(),
                max_retries=settings.http_max_retries,
                backoff_base=settings.http_backoff_base,
            )
        endpoint = settings.bitrix24_client_endpoint.strip()
        if not endpoint and settings.bitrix24_portal.strip():
            portal = settings.bitrix24_portal.strip().rstrip("/")
            endpoint = f"{portal}/rest/"
        if not endpoint or not settings.bitrix24_access_token.strip():
            raise BitrixError(
                "config",
                "NO_AUTH",
                "Задайте BITRIX_WEBHOOK_URL или BITRIX24_ACCESS_TOKEN + portal/endpoint",
            )
        client = cls(
            endpoint,
            max_retries=settings.http_max_retries,
            backoff_base=settings.http_backoff_base,
        )
        client._auth = settings.bitrix24_access_token.strip()
        return client

    def _post(self, method: str, params: dict[str, Any] | None = None) -> dict[str, Any]:
        method_clean = method.strip().lstrip("/")
        url = f"{self.base_url}{method_clean}"
        payload = dict(params or {})
        if self._auth:
            payload["auth"] = self._auth

        def _do() -> dict[str, Any]:
            with httpx.Client(timeout=self.timeout) as http:
                resp = http.post(url, json=payload)
                try:
                    body = resp.json()
                except Exception as exc:
                    raise BitrixError(
                        method_clean,
                        f"HTTP_{resp.status_code}",
                        f"Non-JSON response: {resp.text[:200]}",
                    ) from exc
                if body.get("error"):
                    err = BitrixError(
                        method_clean,
                        str(body.get("error")),
                        str(body.get("error_description") or body.get("error")),
                        body,
                    )
                    code = str(body.get("error") or "")
                    if code in {"QUERY_LIMIT_EXCEEDED", "INTERNAL_SERVER_ERROR"} or code.startswith(
                        "HTTP_5"
                    ):
                        raise err
                    raise _NoRetry(err) from err
                return body

        try:
            return with_retry(
                _do,
                max_retries=self.max_retries,
                backoff_base=self.backoff_base,
                retry_on=(httpx.TransportError, BitrixError),
                label=f"bitrix.{method_clean}",
            )
        except _NoRetry as wrapped:
            raise wrapped.err from wrapped

    def call(self, method: str, params: dict[str, Any] | None = None) -> Any:
        return self._post(method, params).get("result")

    def list_all(self, method: str, params: dict[str, Any] | None = None) -> list[Any]:
        params = dict(params or {})
        all_rows: list[Any] = []
        start = 0
        while True:
            body = self._post(method, {**params, "start": start})
            rows = body.get("result") or []
            if isinstance(rows, dict):
                return [rows]
            all_rows.extend(rows)
            nxt = body.get("next")
            if nxt is None:
                break
            start = int(nxt)
            if not rows:
                break
        return all_rows
