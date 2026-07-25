"""FastAPI application: health, Bitrix handlers, cron sync trigger."""

from __future__ import annotations

import logging
from typing import Any

from fastapi import FastAPI, Header, HTTPException, Query, Request
from fastapi.responses import JSONResponse

from kwork_bitrix import __version__
from kwork_bitrix.config import get_settings
from kwork_bitrix.logging_setup import setup_logging
from kwork_bitrix.pipeline import run_sync

setup_logging(get_settings().log_level)
log = logging.getLogger("kwork_bitrix.app")

app = FastAPI(
    title="Bober AI Kwork Bitrix",
    description=(
        "Lead aggregation for Bitrix24 (Marketplace-ready local app). "
        "Kwork access is unofficial — sellers use their own credentials; disclose in listing."
    ),
    version=__version__,
)


def _check_sync_token(
    authorization: str | None,
    x_sync_token: str | None,
    token_query: str | None,
) -> None:
    settings = get_settings()
    expected = settings.sync_token.strip()
    if not expected:
        # Dev-friendly: allow if unset, but warn
        log.warning("KWORK_BITRIX_SYNC_TOKEN unset — sync endpoint is open")
        return
    provided = ""
    if x_sync_token:
        provided = x_sync_token.strip()
    elif authorization and authorization.lower().startswith("bearer "):
        provided = authorization[7:].strip()
    elif token_query:
        provided = token_query.strip()
    if provided != expected:
        raise HTTPException(status_code=401, detail="Invalid sync token")


@app.get("/health")
def health() -> dict[str, Any]:
    settings = get_settings()
    return {
        "ok": True,
        "service": "kwork-bitrix",
        "version": __version__,
        "bitrix_configured": settings.bitrix_configured(),
        "kwork_cookie_configured": bool(
            settings.kwork_cookie or settings.kwork_cookies_file
        ),
        "kwork_login_configured": bool(settings.kwork_login),
    }


@app.get("/")
def root() -> dict[str, str]:
    return {
        "service": "kwork-bitrix",
        "docs": "/docs",
        "health": "/health",
        "sync": "POST /sources/kwork/sync",
    }


@app.post("/bitrix/install")
async def bitrix_install(request: Request) -> dict[str, Any]:
    """
    Placeholder for local/marketplace install handshake.
    Incoming webhook install is documented in README (preferred for v0.1).
    OAuth ONAPPINSTALL can be wired here later.
    """
    body: dict[str, Any] = {}
    try:
        body = await request.json()
    except Exception:
        body = dict(await request.form())  # type: ignore[arg-type]
    log.info("bitrix/install ping keys=%s", list(body.keys())[:20])
    return {"ok": True, "message": "Kwork Bitrix install acknowledged (webhook mode)"}


@app.post("/bitrix/webhook")
async def bitrix_webhook(request: Request) -> dict[str, Any]:
    """
    Optional inbound Bitrix events (e.g. ONCRMLEADADD).
    v0.1 is primarily outbound Bitrix writes; this logs and acknowledges.
    """
    try:
        body = await request.json()
    except Exception:
        body = {"raw": (await request.body()).decode("utf-8", errors="replace")[:500]}
    event = body.get("event") or body.get("EVENT") or "unknown"
    log.info("bitrix/webhook event=%s", event)
    return {"ok": True, "event": event}


@app.post("/sources/kwork/sync")
@app.get("/sources/kwork/sync")
def kwork_sync(
    dry_run: bool = Query(False),
    json_file: str | None = Query(None),
    authorization: str | None = Header(None),
    x_sync_token: str | None = Header(None, alias="X-Sync-Token"),
    token: str | None = Query(None),
) -> JSONResponse:
    _check_sync_token(authorization, x_sync_token, token)
    result = run_sync(source="kwork", dry_run=dry_run, json_file=json_file)
    status = 200 if result.get("ok") else 502
    if result.get("error") == "kwork_session_expired":
        status = 503
    return JSONResponse(result, status_code=status)


@app.post("/sources/{source_name}/sync")
def source_sync(
    source_name: str,
    dry_run: bool = Query(False),
    authorization: str | None = Header(None),
    x_sync_token: str | None = Header(None, alias="X-Sync-Token"),
    token: str | None = Query(None),
) -> JSONResponse:
    if source_name not in ("kwork", "telegram", "flru", "all"):
        raise HTTPException(404, f"Unknown source: {source_name}")
    _check_sync_token(authorization, x_sync_token, token)
    result = run_sync(source=source_name, dry_run=dry_run)
    status = 200 if result.get("ok") else 502
    return JSONResponse(result, status_code=status)


@app.post("/funnel/ensure")
def funnel_ensure(
    dry_run: bool = Query(False),
    authorization: str | None = Header(None),
    x_sync_token: str | None = Header(None, alias="X-Sync-Token"),
    token: str | None = Query(None),
) -> dict[str, Any]:
    _check_sync_token(authorization, x_sync_token, token)
    from kwork_bitrix.bitrix.client import BitrixClient
    from kwork_bitrix.bitrix.funnel import ensure_funnel

    settings = get_settings()
    client = BitrixClient.from_settings(settings)
    return ensure_funnel(client, settings=settings, dry_run=dry_run)
