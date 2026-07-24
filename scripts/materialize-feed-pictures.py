#!/usr/bin/env python3
"""Create unique 320x320 JPEG offer pictures for Yandex YML (sample uses ~320px)."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image

SIZE = 320
QUALITY = 82


def center_crop_square(im: Image.Image) -> Image.Image:
    im = im.convert("RGB")
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    return im.crop((left, top, left + side, top + side)).resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
    mapping = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}
    out_dir = root / "public" / "stock" / "offers"
    out_dir.mkdir(parents=True, exist_ok=True)

    written = 0
    for offer_id, src_rel in mapping.items():
        src = root / "public" / src_rel.lstrip("/")
        if not src.exists():
            print(f"missing source: {src}", file=sys.stderr)
            return 1
        dest = out_dir / f"{offer_id}.jpg"
        im = Image.open(src)
        center_crop_square(im).save(dest, format="JPEG", quality=QUALITY, optimize=True)
        written += 1
        print(f"ok {dest.relative_to(root)} ({dest.stat().st_size} bytes)")

    print(f"materialize-feed-pictures: {written} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
