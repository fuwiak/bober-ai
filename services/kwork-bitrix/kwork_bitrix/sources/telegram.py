"""Telegram channel source — stub.

Future: Telethon / Bot API listen on a channel the seller owns or is allowed to read.
Does not scrape private chats of third parties.
"""

from __future__ import annotations

import logging

from kwork_bitrix.models import Lead

log = logging.getLogger(__name__)


class TelegramSource:
    name = "telegram"

    def fetch_leads(self) -> list[Lead]:
        log.warning(
            "Telegram source is a stub — configure KWORK_BITRIX_TG_* in a future release. Returning []."
        )
        return []
