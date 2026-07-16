import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { LEGAL_ENTITY, LEGAL_ROUTES, POLICY_UPDATED_AT } from "@/lib/legal";
import { DEFAULT_KEYWORDS, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Условия оказания услуг",
  description:
    `Условия заказа и оказания услуг ${SITE_NAME}: предмет, договор, смета, оплата, сроки и контакты.`,
  keywords: [...DEFAULT_KEYWORDS, "условия оказания услуг", "договор", "смета", "прайс"],
  alternates: {
    canonical: absoluteUrl(LEGAL_ROUTES.terms),
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Условия оказания услуг" updatedAt={POLICY_UPDATED_AT}>
      <section>
        <h2 className="card-title text-lg">1. Исполнитель</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>Наименование: {LEGAL_ENTITY.name}</li>
          <li>ИНН: {LEGAL_ENTITY.inn}</li>
          <li>ОГРНИП: {LEGAL_ENTITY.ogrnip}</li>
          <li>Адрес: {LEGAL_ENTITY.address}</li>
          <li>
            Email:{" "}
            <a href={`mailto:${LEGAL_ENTITY.email}`} className="text-link">
              {LEGAL_ENTITY.email}
            </a>
          </li>
          <li>
            Телефон:{" "}
            <a href={`tel:${LEGAL_ENTITY.phone}`} className="text-link">
              {LEGAL_ENTITY.phone}
            </a>
          </li>
          <li>
            Сайт:{" "}
            <a href={LEGAL_ENTITY.site} className="text-link">
              {LEGAL_ENTITY.site}
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">2. Предмет услуг</h2>
        <p className="mt-3">
          Исполнитель оказывает коммерческие услуги по аудиту, проектированию, внедрению и сопровождению систем
          автоматизации и искусственного интеллекта для бизнеса (включая интеграции с CRM, документами, продажами и
          поддержкой).
        </p>
        <p className="mt-3">
          Описание услуг и актуальный прайс-лист размещены на страницах{" "}
          <Link href="/services" className="text-link">
            Услуги
          </Link>{" "}
          и{" "}
          <Link href="/pricing" className="text-link">
            Стоимость
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">3. Как заказать услугу</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>форма заявки на сайте (в том числе на главной в блоке «Контакт»);</li>
          <li>телефон, Telegram, WhatsApp или email, указанные на сайте;</li>
          <li>ответ на заявку — в рабочее время, ориентир до 4 часов;</li>
          <li>предварительная смета — ориентир до 24 часов после уточнения задачи.</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">4. Договор, NDA и смета</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>работы выполняются по договору (или счёту-оферте) с фиксированной сметой до старта;</li>
          <li>до обмена конфиденциальными данными может быть подписан NDA;</li>
          <li>объём, сроки и стоимость фиксируются в смете / приложении к договору;</li>
          <li>изменения объёма оформляются дополнительным соглашением.</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">5. Оплата</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>безналичный расчёт по счёту на реквизиты ИП;</li>
          <li>оплата по этапам или 100% предоплата — по согласованию в договоре;</li>
          <li>цены на сайте указаны «от» и уточняются в смете под задачу заказчика.</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">6. Срок и результат</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>срок оказания услуги указывается в смете (ориентиры — на странице стоимости);</li>
          <li>результат передаётся заказчику с документацией и доступом к артефактам проекта;</li>
          <li>приёмка — по акту или письменному подтверждению завершения этапа.</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">7. Контакты для заказа</h2>
        <p className="mt-3">
          Заявку можно оставить на{" "}
          <Link href="/#contact" className="text-link">
            странице контактов
          </Link>
          , по телефону {LEGAL_ENTITY.phone} или на email {LEGAL_ENTITY.email}.
        </p>
      </section>
    </LegalPageLayout>
  );
}
