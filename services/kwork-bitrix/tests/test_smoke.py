"""Smoke tests without live Bitrix / Kwork."""

from __future__ import annotations

from pathlib import Path

from kwork_bitrix.models import Lead
from kwork_bitrix.pipeline import run_sync
from kwork_bitrix.sources.base import load_leads_from_json
from kwork_bitrix.sources.flru import FlRuSource
from kwork_bitrix.sources.telegram import TelegramSource


ROOT = Path(__file__).resolve().parents[3]
EXAMPLE = ROOT / "data" / "kwork-orders.example.json"


def test_load_json_example():
    leads = load_leads_from_json(EXAMPLE)
    assert len(leads) >= 2
    assert leads[0].source == "kwork"
    assert leads[0].external_id


def test_stubs_empty():
    assert TelegramSource().fetch_leads() == []
    assert FlRuSource().fetch_leads() == []


def test_dry_run_json_without_bitrix(monkeypatch):
    from kwork_bitrix import config

    monkeypatch.setenv("BITRIX_WEBHOOK_URL", "")
    monkeypatch.setenv("BITRIX24_ACCESS_TOKEN", "")
    config.get_settings.cache_clear()
    result = run_sync(
        source="kwork",
        dry_run=True,
        json_file=str(EXAMPLE),
    )
    assert result["ok"] is True
    assert result["dry_run"] is True
    assert result["stats"]["fetched"] >= 2
    config.get_settings.cache_clear()


def test_lead_originator():
    lead = Lead(external_id="1", source="kwork", title="t")
    assert lead.originator_id == "kwork"
