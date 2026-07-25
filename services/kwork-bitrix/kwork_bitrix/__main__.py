"""CLI entry: python -m kwork_bitrix [serve|sync|ensure-funnel|dry-run]."""

from __future__ import annotations

import argparse
import json
import logging
import sys

from kwork_bitrix.config import get_settings
from kwork_bitrix.logging_setup import setup_logging


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="kwork-bitrix",
        description="Bober AI Kwork Bitrix — Bitrix24 lead aggregation",
    )
    parser.add_argument(
        "command",
        nargs="?",
        default="serve",
        choices=("serve", "sync", "ensure-funnel", "dry-run"),
        help="serve=API, sync=Kwork→Bitrix, ensure-funnel=create stages, dry-run=fetch only",
    )
    parser.add_argument("--host", default=None)
    parser.add_argument("--port", type=int, default=None)
    parser.add_argument(
        "--source",
        default="kwork",
        choices=("kwork", "telegram", "flru", "all"),
        help="Source for sync / dry-run",
    )
    parser.add_argument(
        "--json-file",
        default=None,
        help="Optional JSON orders file (offline dry-run / sync without live Kwork)",
    )
    parser.add_argument("--no-write", action="store_true", help="Alias for dry-run on sync")
    args = parser.parse_args(argv)

    settings = get_settings()
    setup_logging(settings.log_level)
    log = logging.getLogger("kwork_bitrix")

    if args.command == "serve":
        import uvicorn

        host = args.host or settings.host
        port = args.port or settings.port
        log.info("Starting Kwork Bitrix on %s:%s", host, port)
        uvicorn.run(
            "kwork_bitrix.app:app",
            host=host,
            port=port,
            reload=False,
        )
        return 0

    if args.command == "ensure-funnel":
        from kwork_bitrix.bitrix.client import BitrixClient
        from kwork_bitrix.bitrix.funnel import ensure_funnel

        client = BitrixClient.from_settings(settings)
        result = ensure_funnel(client, dry_run=False)
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0

    dry = args.command == "dry-run" or args.no_write
    from kwork_bitrix.pipeline import run_sync

    result = run_sync(
        settings=settings,
        source=args.source,
        dry_run=dry,
        json_file=args.json_file,
    )
    print(json.dumps(result, ensure_ascii=False, indent=2, default=str))
    return 0 if result.get("ok") else 1


if __name__ == "__main__":
    sys.exit(main())
