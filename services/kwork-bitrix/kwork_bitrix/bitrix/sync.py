"""Upsert leads/deals into Bitrix with ORIGINATOR_ID + ORIGIN_ID dedup."""

from __future__ import annotations

import logging
import re
from typing import Any

from kwork_bitrix.bitrix.client import BitrixClient
from kwork_bitrix.config import Settings
from kwork_bitrix.models import Lead

log = logging.getLogger(__name__)


def _opportunity(lead: Lead) -> float | None:
    if not lead.budget:
        return None
    cleaned = re.sub(r"[^\d.,]", "", str(lead.budget)).replace(",", ".")
    try:
        n = float(cleaned)
    except ValueError:
        return None
    return n if n > 0 else None


def _comments(lead: Lead, profile_url: str) -> str:
    parts = [
        f"Источник: {lead.source} ({profile_url})" if lead.source == "kwork" else f"Источник: {lead.source}",
        lead.url or f"External ID: {lead.external_id}",
        f"Статус источника: {lead.status}" if lead.status else "",
        f"Бюджет: {lead.budget}" if lead.budget else "",
        f"Контакт @{lead.contact_username.lstrip('@')}" if lead.contact_username else "",
        lead.notes or "",
    ]
    return "\n".join(p for p in parts if p)[:5000]


def find_existing_deal(client: BitrixClient, lead: Lead) -> dict[str, Any] | None:
    rows = (
        client.call(
            "crm.deal.list",
            {
                "filter": {
                    "ORIGINATOR_ID": lead.originator_id,
                    "ORIGIN_ID": lead.external_id,
                },
                "select": ["ID", "TITLE", "STAGE_ID", "OPPORTUNITY", "CATEGORY_ID"],
            },
        )
        or []
    )
    return rows[0] if rows else None


def find_existing_lead(client: BitrixClient, lead: Lead) -> dict[str, Any] | None:
    rows = (
        client.call(
            "crm.lead.list",
            {
                "filter": {
                    "ORIGINATOR_ID": lead.originator_id,
                    "ORIGIN_ID": lead.external_id,
                },
                "select": ["ID", "TITLE", "STATUS_ID", "OPPORTUNITY"],
            },
        )
        or []
    )
    return rows[0] if rows else None


def upsert_deal(
    client: BitrixClient,
    lead: Lead,
    *,
    settings: Settings,
    source_id: str,
    category_id: int,
    stage_id: str,
    dry_run: bool = False,
) -> dict[str, Any]:
    title = f"[{lead.source}] {lead.title}"
    if lead.contact_name:
        title = f"{title} — {lead.contact_name}"

    fields: dict[str, Any] = {
        "TITLE": title[:255],
        "SOURCE_ID": source_id,
        "SOURCE_DESCRIPTION": f"{lead.source} · {lead.status}"[:255],
        "COMMENTS": _comments(lead, settings.kwork_profile_url),
        "OPENED": "Y",
        "ORIGINATOR_ID": lead.originator_id,
        "ORIGIN_ID": lead.external_id,
        "CATEGORY_ID": category_id,
    }
    opp = _opportunity(lead)
    if opp is not None:
        fields["OPPORTUNITY"] = opp
        fields["CURRENCY_ID"] = "RUB"

    existing = find_existing_deal(client, lead)
    if existing:
        # Do not move stage on update — preserve funnel progress
        fields.pop("CATEGORY_ID", None)
        if dry_run:
            log.info("[dry-run] deal update #%s %s", existing["ID"], lead.external_id)
            return {"action": "update", "id": existing["ID"], "dry_run": True}
        client.call("crm.deal.update", {"id": existing["ID"], "fields": fields})
        log.info("deal ~ #%s external=%s", existing["ID"], lead.external_id)
        return {"action": "update", "id": int(existing["ID"])}

    fields["STAGE_ID"] = stage_id
    if dry_run:
        log.info("[dry-run] deal + %s «%s»", lead.external_id, lead.title)
        return {"action": "create", "id": -1, "dry_run": True}
    new_id = client.call("crm.deal.add", {"fields": fields})
    log.info("deal + #%s external=%s", new_id, lead.external_id)
    return {"action": "create", "id": int(new_id)}


def upsert_lead_entity(
    client: BitrixClient,
    lead: Lead,
    *,
    settings: Settings,
    source_id: str,
    dry_run: bool = False,
) -> dict[str, Any]:
    fields: dict[str, Any] = {
        "TITLE": f"[{lead.source}] {lead.title}"[:255],
        "NAME": lead.contact_name or lead.contact_username or "Контакт",
        "SOURCE_ID": source_id,
        "SOURCE_DESCRIPTION": f"{lead.source} · {lead.status}"[:255],
        "COMMENTS": _comments(lead, settings.kwork_profile_url),
        "OPENED": "Y",
        "ORIGINATOR_ID": lead.originator_id,
        "ORIGIN_ID": lead.external_id,
    }
    opp = _opportunity(lead)
    if opp is not None:
        fields["OPPORTUNITY"] = opp
        fields["CURRENCY_ID"] = "RUB"
    if lead.email:
        fields["EMAIL"] = [{"VALUE": lead.email, "VALUE_TYPE": "WORK"}]
    if lead.phone:
        fields["PHONE"] = [{"VALUE": lead.phone, "VALUE_TYPE": "WORK"}]

    existing = find_existing_lead(client, lead)
    if existing:
        if dry_run:
            return {"action": "update", "id": existing["ID"], "dry_run": True}
        client.call("crm.lead.update", {"id": existing["ID"], "fields": fields})
        return {"action": "update", "id": int(existing["ID"])}
    if dry_run:
        return {"action": "create", "id": -1, "dry_run": True}
    new_id = client.call("crm.lead.add", {"fields": fields})
    return {"action": "create", "id": int(new_id)}


def upsert_lead(
    client: BitrixClient,
    lead: Lead,
    *,
    settings: Settings,
    source_id: str,
    category_id: int | None,
    stage_id: str | None,
    dry_run: bool = False,
) -> dict[str, Any]:
    if settings.entity == "lead":
        return upsert_lead_entity(
            client, lead, settings=settings, source_id=source_id, dry_run=dry_run
        )
    if category_id is None or not stage_id:
        raise ValueError("category_id and stage_id required for deal entity")
    return upsert_deal(
        client,
        lead,
        settings=settings,
        source_id=source_id,
        category_id=category_id,
        stage_id=stage_id,
        dry_run=dry_run,
    )
