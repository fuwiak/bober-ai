/**
 * Support chat widget — open/close, canned replies, contact handoff.
 * No LLM backend; keyword replies + CTA to Telegram / contact modal.
 */

type ReplyRule = { test: RegExp; reply: string };

const RULES: ReplyRule[] = [
  {
    test: /стоим|цен|бюджет|сколько|смет|прайс|price|cost/i,
    reply:
      "Ориентир: аудит процесса от 150 000 ₽, пилот от 300 000 ₽, внедрение от 500 000 ₽. Точная вилка — после короткого брифа. Могу открыть форму заявки или Telegram.",
  },
  {
    test: /пилот|poc|proof|срок|как начать|старт/i,
    reply:
      "Пилот обычно на одном контуре алертов или одном процессе: KPI по времени разбора, фиксированная смета, NDA по запросу. Старт — discovery 30 минут, затем план на 24 часа.",
  },
  {
    test: /kuma|kira|soc|siem|xdr|алерт|инцидент|иб\b|безопасн/i,
    reply:
      "Контур: KUMA / Next XDR → KIRA или частный LLM (саммари, IoC, timeline) → заявка Bitrix24 / эскалация / RAG по вашим регламентам. Не «чатбот рядом с антивирусом» — внедрение и автоматизация вокруг вашего SIEM.",
  },
  {
    test: /bitrix|тикет|заявк|эскал|workflow|интеграц/i,
    reply:
      "После разбора алерта создаём заявку, назначаем ответственного и эскалируем критичное. Каналы: Bitrix24, Telegram, email, helpdesk — под ваш процесс.",
  },
  {
    test: /входит|состав|scope|что делаете|услуг/i,
    reply:
      "В пилоте: связка источников, разбор алертов (KIRA / LLM), заявка и эскалация, короткий отчёт. В полном внедрении — RAG по регламентам, каналы Bitrix24/Telegram и передача контура вашей команде.",
  },
  {
    test: /телеграм|telegram|связат|контакт|позвон|напис|менеджер|обсуд/i,
    reply:
      "Быстрый канал — Telegram. Или короткая форма: имя и контакт. Ниже кнопки.",
  },
  {
    test: /nda|контур|on.?prem|закрыт|152|данных/i,
    reply:
      "Для чувствительных данных — закрытый контур / private LLM, контроль доступа и журналирование. NDA оформляем до обмена материалами.",
  },
];

const FALLBACK =
  "Могу кратко ответить по пилоту, стоимости, KUMA/KIRA и интеграции с Bitrix24. Если нужен живой разбор задачи — Telegram или форма заявки.";

function pickReply(text: string): string {
  const hit = RULES.find((rule) => rule.test.test(text));
  return hit?.reply ?? FALLBACK;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bubble(role: "bot" | "user", text: string): HTMLElement {
  const row = document.createElement("div");
  row.className = `support-chat__row support-chat__row--${role}`;
  if (role === "bot") {
    row.innerHTML = `
      <div class="support-chat__avatar" aria-hidden="true">
        <span>B</span>
      </div>
      <div class="support-chat__bubble support-chat__bubble--bot"><p>${escapeHtml(text)}</p></div>
    `;
  } else {
    row.innerHTML = `
      <div class="support-chat__bubble support-chat__bubble--user"><p>${escapeHtml(text)}</p></div>
    `;
  }
  return row;
}

function handoff(): HTMLElement {
  const row = document.createElement("div");
  row.className = "support-chat__row support-chat__row--bot";
  row.innerHTML = `
    <div class="support-chat__avatar" aria-hidden="true"><span>B</span></div>
    <div class="support-chat__bubble support-chat__bubble--bot support-chat__bubble--actions">
      <p>Куда удобнее продолжить?</p>
      <div class="support-chat__actions">
        <a class="support-chat__action" data-support-telegram href="#" target="_blank" rel="noreferrer">Telegram</a>
        <button type="button" class="support-chat__action support-chat__action--primary" data-contact-open data-contact-goal="support_chat_cta">Заявка</button>
      </div>
    </div>
  `;
  return row;
}

function wireRoot(root: HTMLElement) {
  const panel = root.querySelector<HTMLElement>("[data-support-panel]");
  const launcher = root.querySelector<HTMLButtonElement>("[data-support-open]");
  const closer = root.querySelector<HTMLButtonElement>("[data-support-close]");
  const form = root.querySelector<HTMLFormElement>("[data-support-form]");
  const input = root.querySelector<HTMLTextAreaElement>("[data-support-input]");
  const scroll = root.querySelector<HTMLElement>("[data-support-scroll]");
  const sendBtn = root.querySelector<HTMLButtonElement>("[data-support-send]");
  const chips = root.querySelectorAll<HTMLButtonElement>("[data-support-chip]");
  const telegramUrl = root.dataset.telegram || "#";

  if (!panel || !launcher || !closer || !form || !input || !scroll || !sendBtn) return;

  const setOpen = (open: boolean) => {
    root.dataset.open = open ? "true" : "false";
    document.body.classList.toggle("support-chat-open", open);
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      window.setTimeout(() => input.focus(), 40);
    }
  };

  launcher.addEventListener("click", () => setOpen(true));
  closer.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && root.dataset.open === "true") setOpen(false);
  });

  const syncSend = () => {
    const has = input.value.trim().length > 0;
    sendBtn.disabled = !has;
  };
  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 100)}px`;
    syncSend();
  });
  syncSend();

  const append = (node: HTMLElement) => {
    scroll.appendChild(node);
    scroll.scrollTop = scroll.scrollHeight;
    const tg = node.querySelector<HTMLAnchorElement>("[data-support-telegram]");
    if (tg) tg.href = telegramUrl;
  };

  const respond = (text: string) => {
    append(bubble("user", text));
    const typing = document.createElement("div");
    typing.className = "support-chat__row support-chat__row--bot";
    typing.innerHTML = `
      <div class="support-chat__avatar" aria-hidden="true"><span>B</span></div>
      <div class="support-chat__bubble support-chat__bubble--bot support-chat__typing" aria-hidden="true">
        <i></i><i></i><i></i>
      </div>
    `;
    append(typing);
    window.setTimeout(() => {
      typing.remove();
      append(bubble("bot", pickReply(text)));
      if (/телеграм|telegram|связат|контакт|заявк|обсуд|менеджер/i.test(text) || /стоим|цен|бюджет/i.test(text)) {
        append(handoff());
      }
    }, 420);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    input.style.height = "auto";
    syncSend();
    respond(text);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const text = chip.dataset.supportChip || chip.textContent || "";
      if (!text) return;
      setOpen(true);
      respond(text);
    });
  });
}

export function initSupportChat() {
  document.querySelectorAll<HTMLElement>("[data-support-chat]").forEach((root) => {
    if (root.dataset.wired === "1") return;
    root.dataset.wired = "1";
    document.body.classList.add("has-support-chat");
    wireRoot(root);
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSupportChat, { once: true });
  } else {
    initSupportChat();
  }
  document.addEventListener("htmx:afterSwap", initSupportChat);
}
