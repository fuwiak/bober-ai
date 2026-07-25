"""Runtime configuration via env / .env (no secrets in repo)."""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

# Funnel stage keys (stable STATUS_ID suffixes inside deal category)
FUNNEL_STAGES: tuple[tuple[str, str, int], ...] = (
    ("NEW", "Новый", 10),
    ("FIT", "Подходит", 20),
    ("REPLY_READY", "Ответ подготовлен", 30),
    ("REPLY_SENT", "Отклик отправлен", 40),
    ("CLIENT_REPLIED", "Клиент ответил", 50),
    ("NEGOTIATION", "Переговоры", 60),
)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", "services/kwork-bitrix/.env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # API
    host: str = "0.0.0.0"
    port: int = 8090
    log_level: str = "INFO"
    sync_token: str = Field(default="", validation_alias="KWORK_BITRIX_SYNC_TOKEN")

    # Bitrix — incoming webhook preferred for local / marketplace install docs
    bitrix_webhook_url: str = Field(default="", validation_alias="BITRIX_WEBHOOK_URL")
    # Optional OAuth (same portal vars as rest of monorepo)
    bitrix24_portal: str = Field(default="", validation_alias="BITRIX24_PORTAL")
    bitrix24_access_token: str = Field(default="", validation_alias="BITRIX24_ACCESS_TOKEN")
    bitrix24_client_endpoint: str = Field(
        default="", validation_alias="BITRIX24_CLIENT_ENDPOINT"
    )

    # Deal funnel
    funnel_category_name: str = Field(
        default="Kwork Bitrix", validation_alias="KWORK_BITRIX_FUNNEL_NAME"
    )
    funnel_category_id: int | None = Field(
        default=None, validation_alias="KWORK_BITRIX_CATEGORY_ID"
    )
    entity: Literal["deal", "lead"] = Field(
        default="deal", validation_alias="KWORK_BITRIX_ENTITY"
    )
    source_id: str = Field(default="KWORKBITRIX", validation_alias="KWORK_BITRIX_SOURCE_ID")

    # Kwork — seller's own credentials only
    kwork_cookie: str = Field(default="", validation_alias="KWORK_COOKIE")
    kwork_cookies_file: str = Field(default="", validation_alias="KWORK_COOKIES_FILE")
    kwork_user_agent: str = Field(
        default=(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        ),
        validation_alias="KWORK_USER_AGENT",
    )
    kwork_pull_statuses: str = Field(default="all", validation_alias="KWORK_PULL_STATUSES")
    kwork_profile_url: str = Field(
        default="https://kwork.ru/user/pasha_stasinski",
        validation_alias="KWORK_PROFILE_URL",
    )
    # Optional pykwork login (mobile API — unofficial, ToS risk)
    kwork_login: str = Field(default="", validation_alias="KWORK_LOGIN")
    kwork_password: str = Field(default="", validation_alias="KWORK_PASSWORD")
    kwork_backend: Literal["auto", "session", "pykwork"] = Field(
        default="auto", validation_alias="KWORK_BACKEND"
    )

    # Alerts when session dies
    alert_telegram_bot_token: str = Field(
        default="", validation_alias="KWORK_BITRIX_ALERT_TG_BOT_TOKEN"
    )
    alert_telegram_chat_id: str = Field(
        default="", validation_alias="KWORK_BITRIX_ALERT_TG_CHAT_ID"
    )
    alert_email_to: str = Field(default="", validation_alias="KWORK_BITRIX_ALERT_EMAIL")

    # HTTP retry
    http_max_retries: int = 3
    http_backoff_base: float = 0.8

    def bitrix_configured(self) -> bool:
        return bool(self.bitrix_webhook_url.strip()) or bool(
            self.bitrix24_access_token.strip()
            and (self.bitrix24_client_endpoint.strip() or self.bitrix24_portal.strip())
        )

    def resolve_cookies_path(self) -> Path | None:
        raw = self.kwork_cookies_file.strip()
        if not raw:
            return None
        if raw.startswith("~"):
            return Path.home() / raw[1:].lstrip("/")
        return Path(raw)


@lru_cache
def get_settings() -> Settings:
    return Settings()
