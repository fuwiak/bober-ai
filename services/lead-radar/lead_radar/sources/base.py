"""Shared helpers for sources."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from lead_radar.models import Lead


def load_leads_from_json(path: str | Path, *, source: str = "kwork") -> list[Lead]:
    """Load offline fixture (same shape as data/kwork-orders.example.json)."""
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    rows: list[Any]
    if isinstance(data, list):
        rows = data
    else:
        rows = data.get("orders") or data.get("items") or data.get("leads") or []
    leads: list[Lead] = []
    for raw in rows:
        if not isinstance(raw, dict):
            continue
        ext = str(
            raw.get("order_id")
            or raw.get("external_id")
            or raw.get("id")
            or ""
        ).strip()
        if not ext:
            continue
        leads.append(
            Lead(
                external_id=ext,
                source=str(raw.get("source") or source),
                title=str(raw.get("title") or raw.get("name") or "Lead"),
                contact_name=str(raw.get("buyer_name") or raw.get("contact_name") or ""),
                contact_username=str(
                    raw.get("buyer_username") or raw.get("contact_username") or ""
                ),
                budget=str(raw.get("budget") or raw.get("price") or ""),
                status=str(raw.get("status") or ""),
                url=str(raw.get("order_url") or raw.get("url") or ""),
                email=str(raw.get("email") or ""),
                phone=str(raw.get("phone") or ""),
                notes=str(raw.get("notes") or raw.get("comment") or ""),
                raw=raw,
            )
        )
    return leads
