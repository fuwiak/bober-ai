"""Orchestrate fetch → funnel → Bitrix upsert."""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

from kwork_bitrix.alerts import notify_session_expired
from kwork_bitrix.bitrix.client import BitrixClient, BitrixError
from kwork_bitrix.bitrix.funnel import ensure_funnel
from kwork_bitrix.bitrix.sync import upsert_lead
from kwork_bitrix.config import Settings, get_settings
from kwork_bitrix.models import Lead
from kwork_bitrix.sources.base import load_leads_from_json
from kwork_bitrix.sources.flru import FlRuSource
from kwork_bitrix.sources.kwork import KworkSessionExpired, KworkSource
from kwork_bitrix.sources.telegram import TelegramSource

log = logging.getLogger(__name__)


def _collect(source: str, settings: Settings, json_file: str | None) -> list[Lead]:
    if json_file:
        path = Path(json_file)
        if not path.is_file():
            # try relative to repo root
            alt = Path.cwd() / json_file
            path = alt if alt.is_file() else path
        return load_leads_from_json(path, source=source if source != "all" else "kwork")

    leads: list[Lead] = []
    if source in ("kwork", "all"):
        leads.extend(KworkSource(settings).fetch_leads())
    if source in ("telegram", "all"):
        leads.extend(TelegramSource().fetch_leads())
    if source in ("flru", "all"):
        leads.extend(FlRuSource().fetch_leads())
    return leads


def run_sync(
    *,
    settings: Settings | None = None,
    source: str = "kwork",
    dry_run: bool = False,
    json_file: str | None = None,
) -> dict[str, Any]:
    settings = settings or get_settings()
    stats = {"created": 0, "updated": 0, "errors": 0, "fetched": 0}

    try:
        leads = _collect(source, settings, json_file)
    except KworkSessionExpired as exc:
        log.error("Kwork session expired: %s", exc)
        notify_session_expired(settings, str(exc))
        return {"ok": False, "error": "kwork_session_expired", "detail": str(exc), "stats": stats}

    stats["fetched"] = len(leads)
    log.info("Fetched %s leads from %s%s", len(leads), source, " (json)" if json_file else "")

    if dry_run and not settings.bitrix_configured():
        return {
            "ok": True,
            "dry_run": True,
            "stats": stats,
            "leads": [lead.to_dict() for lead in leads],
            "note": "Bitrix не настроен — показан только fetch",
        }

    try:
        client = BitrixClient.from_settings(settings)
    except BitrixError as exc:
        if dry_run:
            return {
                "ok": True,
                "dry_run": True,
                "stats": stats,
                "leads": [lead.to_dict() for lead in leads],
                "bitrix_error": str(exc),
            }
        return {"ok": False, "error": "bitrix_config", "detail": str(exc), "stats": stats}

    funnel = ensure_funnel(client, settings=settings, dry_run=dry_run)
    source_id = funnel.get("source_id") or settings.source_id
    category_id = funnel.get("category_id")
    stage_id = (funnel.get("stages") or {}).get("NEW") or funnel.get("default_stage")

    results: list[dict[str, Any]] = []
    for lead in leads:
        try:
            res = upsert_lead(
                client,
                lead,
                settings=settings,
                source_id=str(source_id),
                category_id=int(category_id) if category_id is not None else None,
                stage_id=str(stage_id) if stage_id else None,
                dry_run=dry_run,
            )
            if res.get("action") == "create":
                stats["created"] += 1
            else:
                stats["updated"] += 1
            results.append({"external_id": lead.external_id, **res})
        except Exception as exc:
            stats["errors"] += 1
            log.exception("Upsert failed for %s: %s", lead.external_id, exc)
            results.append({"external_id": lead.external_id, "error": str(exc)})

    return {
        "ok": stats["errors"] == 0,
        "dry_run": dry_run,
        "funnel": {
            "category_id": category_id,
            "stages": funnel.get("stages"),
            "source_id": source_id,
        },
        "stats": stats,
        "results": results,
    }
