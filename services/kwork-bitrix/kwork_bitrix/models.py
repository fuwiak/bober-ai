"""Shared lead model + source protocol."""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any, Protocol


@dataclass
class Lead:
    """Normalized inbound lead from any source."""

    external_id: str
    source: str  # kwork | telegram | flru | ...
    title: str
    contact_name: str = ""
    contact_username: str = ""
    budget: str = ""
    status: str = ""
    url: str = ""
    email: str = ""
    phone: str = ""
    notes: str = ""
    raw: dict[str, Any] = field(default_factory=dict, repr=False)

    @property
    def originator_id(self) -> str:
        return self.source.lower().replace(" ", "_")[:32]

    def to_dict(self) -> dict[str, Any]:
        d = asdict(self)
        d.pop("raw", None)
        return d


class LeadSource(Protocol):
    name: str

    def fetch_leads(self) -> list[Lead]:
        """Return fresh leads from this source (seller's own account / public channel)."""
        ...
