import { expect, test, type Page } from "@playwright/test";

async function preparePage(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("partner-banner-dismissed", "1");
  });
}

test.describe("Форма заявки", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([
      {
        name: "NEXT_LOCALE",
        value: "ru",
        url: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100",
      },
    ]);
    await preparePage(page);
    await page.goto("/#contact");
    await expect(page.getByRole("heading", { name: "Контакты" })).toBeVisible();
    await expect(page.locator("form input#contact")).toBeVisible();
  });

  test("отправляет заявку с заполненными полями и согласиями", async ({ page }) => {
    const form = page.locator("form").filter({ has: page.locator("#name") });

    await form.locator("#name").fill("Тестовый Клиент");
    await form.locator("input#contact").fill("test@example.com");
    await form.locator("#service").fill("ИИ-бот под ключ");
    await form.locator("#message").fill("Нужен бот для поддержки клиентов.");

    await form.locator("#pd-policy").check();
    await form.locator("#pd-consent").check();

    const submit = form.getByRole("button", { name: "Обсудить проект" });
    await expect(submit).toBeEnabled();

    const responsePromise = page.waitForResponse(
      (response) => response.url().includes("/api/contact") && response.request().method() === "POST",
    );

    await submit.click();

    const response = await responsePromise;
    expect(response.ok()).toBeTruthy();
    const body = (await response.json()) as {
      ok?: boolean;
      dryRun?: boolean;
      preview?: { to: string[]; subject: string; text: string };
    };
    expect(body).toMatchObject({ ok: true, dryRun: true });
    expect(body.preview?.to).toEqual(["stasinskipawel@yandex.ru"]);
    expect(body.preview?.subject).toContain("Тестовый Клиент");
    expect(body.preview?.text).toContain("ИИ-бот под ключ");
    expect(body.preview?.text).toContain("Нужен бот для поддержки клиентов.");

    console.log("\n--- Превью тестового письма (dry-run) ---");
    console.log("Получатели:", body.preview?.to.join(", "));
    console.log("Тема:", body.preview?.subject);
    console.log("Текст:\n" + body.preview?.text);
    console.log("----------------------------------------\n");

    await expect(page.getByText("Заявка отправлена. Свяжемся в ближайшее время.")).toBeVisible();
    await expect(form.locator("#name")).toHaveValue("");
    await expect(form.locator("input#contact")).toHaveValue("");
    await expect(form.locator("#message")).toHaveValue("");
    await expect(form.locator("#pd-policy")).not.toBeChecked();
    await expect(form.locator("#pd-consent")).not.toBeChecked();
  });

  test("не даёт отправить без согласий", async ({ page }) => {
    const form = page.locator("form").filter({ has: page.locator("#name") });

    await form.locator("#name").fill("Тест");
    await form.locator("input#contact").fill("+7 900 000-00-00");

    const submit = form.getByRole("button", { name: "Обсудить проект" });
    await expect(submit).toBeDisabled();
  });

  test("API отклоняет заявку без обязательных полей", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: {
        name: "",
        contact: "",
        policyAccepted: true,
        consent: true,
      },
    });

    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "invalid_payload",
      message: "Заполните обязательные поля",
    });
  });
});
