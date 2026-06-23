"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { LEGAL_ROUTES } from "@/lib/legal";

type ContactFormProps = {
  defaultService?: string;
};

function ConsentCheckbox({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline accent-primary"
      />
      <label htmlFor={id} className="text-xs leading-relaxed text-muted">
        {children}
      </label>
    </div>
  );
}

export function ContactForm({ defaultService = "" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState("");
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const canSubmit = policyAccepted && consentAccepted;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setErrorText("");

    const fullMessage = [service ? `Услуга: ${service}` : "", message].filter(Boolean).join("\n\n");

    if (!policyAccepted) {
      setStatus("error");
      setErrorText("Необходимо подтвердить ознакомление с политикой обработки персональных данных");
      return;
    }

    if (!consentAccepted) {
      setStatus("error");
      setErrorText("Необходимо дать согласие на обработку персональных данных");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          message: fullMessage,
          policyAccepted: true,
          consent: true,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message || "Не удалось отправить заявку");
      }
      setStatus("ok");
      setName("");
      setContact("");
      setMessage("");
      setPolicyAccepted(false);
      setConsentAccepted(false);
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Ошибка отправки");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          Имя
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-input"
        />
      </div>
      <div>
        <label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-ink">
          Телефон или email
        </label>
        <input
          id="contact"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="text-input"
        />
      </div>
      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink">
          Услуга
        </label>
        <input
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Например: ИИ-бот под ключ"
          className="text-input"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Сообщение
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="textarea-input"
        />
      </div>
      <div className="space-y-3 rounded-lg border border-hairline bg-surface-soft p-4">
        <ConsentCheckbox id="pd-policy" checked={policyAccepted} onChange={setPolicyAccepted}>
          Я ознакомлен(а) с{" "}
          <Link href={LEGAL_ROUTES.privacyPolicy} className="text-link" target="_blank">
            политикой обработки персональных данных
          </Link>
          .
        </ConsentCheckbox>
        <ConsentCheckbox id="pd-consent" checked={consentAccepted} onChange={setConsentAccepted}>
          Я даю{" "}
          <Link href={LEGAL_ROUTES.consent} className="text-link" target="_blank">
            согласие на обработку персональных данных
          </Link>
          .
        </ConsentCheckbox>
      </div>
      <button type="submit" disabled={status === "sending" || !canSubmit} className="btn-primary w-full">
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>
      {status === "ok" ? (
        <p className="text-sm text-success">Заявка отправлена. Свяжемся в ближайшее время.</p>
      ) : null}
      {status === "error" ? <p className="text-sm text-error">{errorText}</p> : null}
    </form>
  );
}
