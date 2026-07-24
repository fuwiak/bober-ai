import type { Metadata } from "next";
import { LEGAL_ENTITY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Телефон — Bober AI Systems",
  robots: { index: false, follow: false },
};

/** Landing for YML `Ссылка на телефон` — must be HTTPS 200 with a tel: link (not tel: in the feed itself). */
export default function TelPage() {
  const phone = LEGAL_ENTITY.phone;
  const href = phone.startsWith("tel:") ? phone : `tel:${phone.replace(/\s+/g, "")}`;
  const display = phone.replace(/^tel:/i, "");

  return (
    <main
      style={{
        margin: 0,
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
        background: "#0a0a0a",
        color: "#f5f5f5",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <a href={href} style={{ color: "#f5f5f5", fontSize: "1.5rem", letterSpacing: "0.04em" }}>
          {display}
        </a>
        <p style={{ margin: "0.75rem 0 0", color: "#a3a3a3", fontSize: "0.875rem" }}>
          Bober AI Systems · звонок по клику
        </p>
      </div>
    </main>
  );
}
