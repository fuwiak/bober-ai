#!/usr/bin/env python3
"""One-shot: create Kwork Bitrix deal category + 6 stages via Bitrix webhook."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from kwork_bitrix.bitrix.client import BitrixClient  # noqa: E402
from kwork_bitrix.bitrix.funnel import ensure_funnel  # noqa: E402
from kwork_bitrix.config import get_settings  # noqa: E402
from kwork_bitrix.logging_setup import setup_logging  # noqa: E402


def main() -> int:
    settings = get_settings()
    setup_logging(settings.log_level)
    dry = "--dry-run" in sys.argv
    client = BitrixClient.from_settings(settings)
    result = ensure_funnel(client, settings=settings, dry_run=dry)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result.get("ok") else 1


if __name__ == "__main__":
    raise SystemExit(main())
