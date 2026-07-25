"""HTTP retry with exponential backoff."""

from __future__ import annotations

import logging
import time
from collections.abc import Callable
from typing import TypeVar

T = TypeVar("T")
log = logging.getLogger(__name__)


def with_retry(
    fn: Callable[[], T],
    *,
    max_retries: int = 3,
    backoff_base: float = 0.8,
    retry_on: tuple[type[BaseException], ...] = (Exception,),
    label: str = "op",
) -> T:
    last: BaseException | None = None
    for attempt in range(max_retries + 1):
        try:
            return fn()
        except retry_on as exc:  # noqa: PERF203 — intentional retry loop
            last = exc
            if attempt >= max_retries:
                break
            delay = backoff_base * (2**attempt)
            log.warning(
                "%s failed (attempt %s/%s): %s — retry in %.1fs",
                label,
                attempt + 1,
                max_retries + 1,
                exc,
                delay,
            )
            time.sleep(delay)
    assert last is not None
    raise last
