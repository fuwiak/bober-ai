"""Optional alerts when Kwork session expires."""

from __future__ import annotations

import logging
import smtplib
from email.message import EmailMessage

import httpx

from kwork_bitrix.config import Settings

log = logging.getLogger(__name__)


def notify_session_expired(settings: Settings, detail: str) -> None:
    text = (
        "Kwork Bitrix: сессия Kwork истекла / не авторизована.\n"
        f"{detail}\n"
        "Обновите KWORK_COOKIE или KWORK_LOGIN/PASSWORD. "
        "Cookies не коммитить."
    )
    if settings.alert_telegram_bot_token and settings.alert_telegram_chat_id:
        try:
            url = (
                f"https://api.telegram.org/bot{settings.alert_telegram_bot_token}/sendMessage"
            )
            with httpx.Client(timeout=15.0) as http:
                http.post(
                    url,
                    json={
                        "chat_id": settings.alert_telegram_chat_id,
                        "text": text[:3500],
                    },
                )
            log.info("Sent Telegram session-expired alert")
        except Exception as exc:
            log.warning("Telegram alert failed: %s", exc)

    if settings.alert_email_to:
        # Best-effort local SMTP — operator should wire a real relay; we only log if unset
        log.warning(
            "Email alert configured (%s) but SMTP is not wired in scaffold — message:\n%s",
            settings.alert_email_to,
            text,
        )
        # Keep EmailMessage import used for future SMTP hook
        _ = EmailMessage
        _ = smtplib
