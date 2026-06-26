import { expect, test, type Page } from "@playwright/test";

async function dismissCookieBanner(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("cookie-consent", "accepted");
  });
}

test.describe("Форма заявки", () => {
  test.beforeEach(async ({ page }) => {
    await dismissCookieBanner(page);
    await page.goto("/#contact");
    await expect(page.getByRole("heading", { name: "Связаться" })).toBeVisible();
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

    const submit = form.getByRole("button", { name: "Отправить заявку" });
    await expect(submit).toBeEnabled();

    const responsePromise = page.waitForResponse(
      (response) => response.url().includes("/api/contact") && response.request().method() === "POST",
    );

    await submit.click();

    const response = await responsePromise;
    expect(response.ok()).toBeTruthy();
    await expect(response.json()).resolves.toMatchObject({ ok: true });

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

    const submit = form.getByRole("button", { name: "Отправить заявку" });
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
