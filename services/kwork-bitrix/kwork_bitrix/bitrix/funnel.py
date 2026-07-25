"""Create / resolve Kwork Bitrix deal category + 6 funnel stages."""

from __future__ import annotations

import logging
from typing import Any

from kwork_bitrix.bitrix.client import BitrixClient
from kwork_bitrix.config import FUNNEL_STAGES, Settings, get_settings

log = logging.getLogger(__name__)


def _stage_status_id(category_id: int, key: str) -> str:
    # Bitrix deal stages: C{categoryId}:{STATUS_ID}
    return f"C{category_id}:{key}"


def ensure_source(client: BitrixClient, settings: Settings | None = None) -> str:
    settings = settings or get_settings()
    source_id = settings.source_id.strip().upper() or "KWORKBITRIX"
    items = client.call("crm.status.entity.items", {"entityId": "SOURCE"}) or []
    for item in items:
        if str(item.get("STATUS_ID", "")).upper() == source_id:
            log.info("CRM source exists: %s", source_id)
            return str(item["STATUS_ID"])
        if item.get("NAME") == "Kwork Bitrix":
            return str(item["STATUS_ID"])
    sort = max((int(i.get("SORT") or 0) for i in items), default=0) + 10
    client.call(
        "crm.status.add",
        {
            "fields": {
                "ENTITY_ID": "SOURCE",
                "STATUS_ID": source_id,
                "NAME": "Kwork Bitrix",
                "SORT": sort,
            }
        },
    )
    log.info("Created CRM source: %s", source_id)
    return source_id


def find_category_id(client: BitrixClient, name: str) -> int | None:
    cats = client.call("crm.dealcategory.list", {}) or []
    # Some portals wrap as {categories: [...]}
    if isinstance(cats, dict):
        cats = cats.get("categories") or cats.get("result") or []
    for cat in cats:
        if str(cat.get("NAME") or "").strip() == name:
            return int(cat["ID"])
    return None


def ensure_funnel(
    client: BitrixClient,
    *,
    settings: Settings | None = None,
    dry_run: bool = False,
) -> dict[str, Any]:
    """
    Ensure deal category + stages:
      Новый → Подходит → Ответ подготовлен → Отклик отправлен → Клиент ответил → Переговоры
    """
    settings = settings or get_settings()
    name = settings.funnel_category_name

    if settings.funnel_category_id is not None:
        category_id = int(settings.funnel_category_id)
        log.info("Using configured KWORK_BITRIX_CATEGORY_ID=%s", category_id)
    else:
        existing = find_category_id(client, name)
        if existing is not None:
            category_id = existing
            log.info("Deal category «%s» already id=%s", name, category_id)
        elif dry_run:
            return {
                "ok": True,
                "dry_run": True,
                "would_create_category": name,
                "stages": [s[1] for s in FUNNEL_STAGES],
            }
        else:
            category_id = int(
                client.call("crm.dealcategory.add", {"fields": {"NAME": name, "SORT": 100}})
            )
            log.info("Created deal category «%s» id=%s", name, category_id)

    entity_id = f"DEAL_STAGE_{category_id}"
    existing_stages = client.call("crm.status.entity.items", {"entityId": entity_id}) or []
    by_status = {str(s.get("STATUS_ID", "")).upper(): s for s in existing_stages}
    by_name = {str(s.get("NAME", "")).strip(): s for s in existing_stages}

    stage_map: dict[str, str] = {}  # key -> full STAGE_ID (C{n}:KEY)
    created: list[str] = []

    for key, title, sort in FUNNEL_STAGES:
        full_id = _stage_status_id(category_id, key)
        found = by_status.get(key.upper()) or by_name.get(title)
        if found:
            status_id = str(found.get("STATUS_ID") or key)
            stage_map[key] = f"C{category_id}:{status_id}" if ":" not in status_id else status_id
            # Bitrix list often returns STATUS_ID without C{n}: prefix
            if ":" not in stage_map[key]:
                stage_map[key] = f"C{category_id}:{status_id}"
            continue
        if dry_run:
            stage_map[key] = full_id
            created.append(title)
            continue
        client.call(
            "crm.status.add",
            {
                "fields": {
                    "ENTITY_ID": entity_id,
                    "STATUS_ID": key,
                    "NAME": title,
                    "SORT": sort,
                }
            },
        )
        stage_map[key] = full_id
        created.append(title)
        log.info("Created stage %s «%s»", full_id, title)

    source_id = None if dry_run else ensure_source(client, settings)

    return {
        "ok": True,
        "dry_run": dry_run,
        "category_id": category_id,
        "category_name": name,
        "entity_id": entity_id,
        "stages": stage_map,
        "created_stages": created,
        "source_id": source_id,
        "default_stage": stage_map.get("NEW"),
    }
