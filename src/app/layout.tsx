import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kinetic AI — облако и корпоративный ИИ",
  description:
    "Официальный партнёр Yandex Cloud: AI-инфраструктура, миграция в облако, безопасность и DevOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
