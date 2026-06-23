import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { LEGAL_ENTITY, LEGAL_ROUTES, POLICY_UPDATED_AT } from "@/lib/legal";
import { DEFAULT_KEYWORDS, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description:
    "Текст согласия на обработку персональных данных при заполнении формы обратной связи на сайте Kinetic AI.",
  keywords: [...DEFAULT_KEYWORDS, "152-ФЗ", "согласие", "персональные данные"],
  alternates: {
    canonical: absoluteUrl(LEGAL_ROUTES.consent),
  },
  robots: { index: true, follow: true },
};

export default function ConsentPage() {
  return (
    <LegalPageLayout title="Согласие на обработку персональных данных" updatedAt={POLICY_UPDATED_AT}>
      <section>
        <p>
          Настоящий документ содержит текст согласия, которое пользователь даёт при отправке формы обратной связи на
          сайте{" "}
          <a href={LEGAL_ENTITY.site} className="text-primary hover:underline">
            {LEGAL_ENTITY.site}
          </a>
          .
        </p>
      </section>

      <section className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-5">
        <h2 className="text-base font-bold text-on-surface">Текст согласия</h2>
        <p className="mt-4">
          Я, субъект персональных данных, действуя свободно, своей волей и в своём интересе, подтверждаю, что даю
          согласие {LEGAL_ENTITY.name} (ИНН {LEGAL_ENTITY.inn}, ОГРНИП {LEGAL_ENTITY.ogrnip}), расположенному по
          адресу: {LEGAL_ENTITY.address}, на обработку моих персональных данных на следующих условиях:
        </p>
        <ol className="mt-4 list-inside list-decimal space-y-2">
          <li>
            <strong className="text-on-surface">Перечень персональных данных:</strong> имя, номер телефона и/или адрес
            электронной почты, текст сообщения, сведения об интересующей услуге.
          </li>
          <li>
            <strong className="text-on-surface">Цели обработки:</strong> обработка обращения, связь для консультации,
            подготовка коммерческого предложения, заключение и исполнение договора.
          </li>
          <li>
            <strong className="text-on-surface">Способы обработки:</strong> сбор, запись, систематизация, накопление,
            хранение, уточнение (обновление, изменение), использование, передача (предоставление, доступ), удаление,
            уничтожение — с использованием средств автоматизации и без них.
          </li>
          <li>
            <strong className="text-on-surface">Передача третьим лицам:</strong> данные могут передаваться
            оператору электронной почты Resend (доставка уведомления Оператору) исключительно для целей обработки
            обращения.
          </li>
          <li>
            <strong className="text-on-surface">Срок действия согласия:</strong> до достижения целей обработки, но не
            более 3 лет с момента отправки формы, либо до момента отзыва согласия.
          </li>
          <li>
            <strong className="text-on-surface">Отзыв согласия:</strong> согласие может быть отозвано путём направления
            письменного уведомления на email{" "}
            <a href={`mailto:${LEGAL_ENTITY.email}`} className="text-primary hover:underline">
              {LEGAL_ENTITY.email}
            </a>{" "}
            с пометкой «Отзыв согласия на обработку персональных данных».
          </li>
        </ol>
        <p className="mt-4">
          Я подтверждаю, что ознакомлен(а) с{" "}
          <Link href={LEGAL_ROUTES.privacyPolicy} className="text-primary hover:underline">
            Политикой обработки персональных данных
          </Link>{" "}
          и понимаю свои права, предусмотренные Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-on-surface">Как даётся согласие на Сайте</h2>
        <p className="mt-3">
          Согласие оформляется путём проставления <strong className="text-on-surface">двух отдельных галочек</strong> в
          форме обратной связи: одна — для подтверждения ознакомления с Политикой обработки персональных данных, вторая
          — для дачи согласия на обработку персональных данных. Галочки не установлены по умолчанию. Без проставления
          каждой из них отправить форму невозможно.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-on-surface">Отзыв согласия</h2>
        <p className="mt-3">
          Для отзыва согласия направьте письмо на{" "}
          <a href={`mailto:${LEGAL_ENTITY.email}`} className="text-primary hover:underline">
            {LEGAL_ENTITY.email}
          </a>{" "}
          с указанием ФИО и контактных данных, указанных при обращении. Оператор прекратит обработку в срок, не
          превышающий 30 дней, за исключением случаев, когда обработка может быть продолжена на ином законном основании.
        </p>
      </section>
    </LegalPageLayout>
  );
}
