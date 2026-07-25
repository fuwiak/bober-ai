"""FL.ru source — stub.

Future: authenticated seller session / official partner API if available.
No scraping of other users' private data beyond the seller's own account.
"""

from __future__ import annotations

import logging

from kwork_bitrix.models import Lead

log = logging.getLogger(__name__)


class FlRuSource:
    name = "flru"

    def fetch_leads(self) -> list[Lead]:
        log.warning(
            "FL.ru source is a stub — not implemented. Returning []. "
            "Marketplace listing must not claim live FL.ru sync until shipped."
        )
        return []
