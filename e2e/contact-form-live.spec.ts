import { expect, test } from "@playwright/test";

const hasResendKey = Boolean(process.env.RESEND_API_KEY);

test.describe("Живая отправка заявки", () => {
  test.skip(!hasResendKey, "Нужен RESEND_API_KEY в окружении для реальной отправки письма");

  test("отправляет тестовое письмо на hello@bober-ai.dev и stasinskipawel@yandex.ru", async ({ request }) => {
    const stamp = new Date().toISOString();
    const payload = {
      name: `[TEST] Тестовый клиент`,
      contact: "test@example.com",
      message: [`Услуга: ИИ-бот под ключ`, "", `Тестовая заявка с формы (${stamp}). Можно удалить.`].join("\n\n"),
      policyAccepted: true,
      consent: true,
    };

    const response = await request.post("/api/contact", { data: payload });
    const body = (await response.json()) as { ok?: boolean; message?: string };

    expect(response.ok(), body.message || JSON.stringify(body)).toBeTruthy();
    expect(body).toMatchObject({ ok: true });

    console.log("\n--- Тестовое письмо отправлено ---");
    console.log("Получатели: hello@bober-ai.dev, stasinskipawel@yandex.ru");
    console.log(`Тема: Заявка с сайта Bober AI Dev от ${payload.name}`);
    console.log("Текст:\n" + `Имя: ${payload.name}\nКонтакт: ${payload.contact}\n\nСообщение:\n${payload.message}`);
    console.log("----------------------------------\n");
  });
});
