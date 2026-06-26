import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PartnerProgramBanner } from "@/components/PartnerProgramBanner";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { LEGAL_ROUTES } from "@/lib/legal";
import { PORTFOLIO, PARTNER_PROGRAM, PROFILE, AVITO_REVIEWS, REVIEWS, SKILLS } from "@/lib/profile";
import {
  formatOfferPrice,
  getOrderTelegramUrl,
  serviceFeedOffers,
} from "@/lib/services-feed";
import { AVITO_REVIEWS_COUNT, AVITO_URL, CONTACT_PHONE, FIVERR_URL, FL_RU_URL, KWORK_URL, MARKETPLACES, TELEGRAM_URL, YANDEX_USLUGI_URL } from "@/lib/site";

function GigCard({
  title,
  description,
  salesNotes,
  deliveryDays,
  slug,
  kworkUrl,
}: {
  title: string;
  description: string;
  salesNotes: string;
  deliveryDays: number;
  slug: string;
  kworkUrl?: string;
}) {
  return (
    <article className="feature-card flex flex-col">
      <h3 className="font-display text-lg tracking-tight text-ink">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{description}</p>
      <div className="mt-6 flex items-end justify-between gap-3 border-t border-hairline pt-5">
        <div>
          <p className="font-display text-xl tracking-tight text-ink">{salesNotes}</p>
          <p className="mt-0.5 text-xs text-muted">{deliveryDays} дн.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href={`/services/${slug}`} className="btn-secondary text-xs">
            Подробнее
          </Link>
          <a
            href={getOrderTelegramUrl(title)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-xs"
          >
            Купить
          </a>
        </div>
      </div>
      {kworkUrl ? (
        <a href={kworkUrl} target="_blank" rel="noreferrer" className="text-link mt-3 text-xs">
          Смотреть на Kwork →
        </a>
      ) : null}
    </article>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <PartnerProgramBanner />
      <main>
        {/* Hero / профиль */}
        <section className="section-band border-b border-hairline-soft">
          <div className="container-editorial grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm text-muted">
                {PROFILE.city} · <span className="text-success">Онлайн</span>
              </p>
              <h1 className="display-lg mt-2">{PROFILE.title}</h1>
              <div className="mt-3 flex flex-wrap gap-2">
                {PROFILE.roles.map((role) => (
                  <span key={role} className="badge-pill text-xs">
                    {role}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted">
                {PROFILE.name} · @{PROFILE.handle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{PROFILE.focus}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="text-ink">
                  <span className="text-primary">★</span> {PROFILE.rating.toFixed(1)} · {PROFILE.reviewsCount}{" "}
                  отзывов на{" "}
                  <a href={YANDEX_USLUGI_URL} target="_blank" rel="noreferrer" className="text-link">
                    Яндекс Услуги
                  </a>
                </span>
                <span>Опыт: {PROFILE.experienceYears} лет</span>
                <span>от {PROFILE.minProjectPrice.toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={getOrderTelegramUrl("консультацию")}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Заказать
                </a>
                <a href={`tel:${CONTACT_PHONE}`} className="btn-secondary">
                  Позвонить
                </a>
                <a href={FIVERR_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                  Fiverr
                </a>
              </div>
              <p className="mt-4 text-sm text-muted">
                Также на{" "}
                {MARKETPLACES.map((item, index) => (
                  <span key={item.name}>
                    {index > 0 ? " · " : null}
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-link">
                      {item.name}
                    </a>
                  </span>
                ))}
              </p>
              <p className="mt-5 text-xs leading-relaxed text-muted-soft">
                Персональные данные размещены с согласия субъекта.{" "}
                <Link href={LEGAL_ROUTES.privacyPolicy} className="text-link">
                  Политика обработки ПДн
                </Link>
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative h-48 w-48 overflow-hidden rounded-full border border-hairline md:h-64 md:w-64">
                <Image
                  src={PROFILE.avatar}
                  alt={PROFILE.name}
                  fill
                  sizes="256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Партнёрская программа */}
        <section id="partners" className="section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <div className="md:grid md:grid-cols-[minmax(0,1fr)_280px] md:items-start md:gap-12">
              <div>
                <span className="badge-coral text-[10px]">Для агентств и знакомых</span>
                <h2 className="display-sm mt-4">{PARTNER_PROGRAM.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
                  Приводите клиентов на AI-проекты и получайте фиксированное вознаграждение без долгих
                  ожиданий — выплата сразу после аванса клиента.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {PARTNER_PROGRAM.steps.map((step, index) => (
                    <article key={step.title} className="feature-card">
                      <span className="font-display text-3xl tracking-tight text-primary/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-body">{step.text}</p>
                    </article>
                  ))}
                </div>
              </div>
              <aside className="feature-card-bordered mt-8 md:mt-0 md:sticky md:top-24">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">Вознаграждение</p>
                <p className="mt-3 font-display text-5xl tracking-tight text-primary">
                  {PARTNER_PROGRAM.commissionPercent}%
                </p>
                <p className="mt-2 text-sm font-medium text-ink">{PARTNER_PROGRAM.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-body">{PARTNER_PROGRAM.payoutNote}</p>
                <ul className="mt-5 space-y-2 border-t border-hairline pt-5 text-sm text-muted">
                  <li>· Без скрытых условий</li>
                  <li>· Прозрачный расчёт от суммы аванса</li>
                  <li>· Подходит фрилансерам, агентствам, интеграторам</li>
                </ul>
                <a
                  href={getOrderTelegramUrl("партнёрскую программу")}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-6 w-full text-center"
                >
                  Стать партнёром
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* Услуги */}
        <section id="services" className="section-band scroll-mt-16 bg-surface-soft">
          <div className="container-editorial">
            <h2 className="display-sm">Готовые услуги</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">
              Фокус — <strong className="font-medium text-ink">Claude и автоматизация</strong>. Готовые пакеты на{" "}
              <a href={KWORK_URL} target="_blank" rel="noreferrer" className="text-link">
                Kwork
              </a>{" "}
              и{" "}
              <a href={FIVERR_URL} target="_blank" rel="noreferrer" className="text-link">
                Fiverr
              </a>
              . Не нашли подходящий тариф — сделаем проект под ваш запрос. «Купить» открывает заказ в Telegram.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {serviceFeedOffers.map((offer) => (
                <GigCard
                  key={offer.id}
                  title={offer.title}
                  description={offer.description}
                  salesNotes={offer.salesNotes}
                  deliveryDays={offer.deliveryDays}
                  slug={offer.slug}
                  kworkUrl={offer.kworkUrl}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Обо мне */}
        <section id="about" className="section-band scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <h2 className="display-sm">Обо мне</h2>
            <p className="mt-5 max-w-3xl whitespace-pre-line text-base leading-relaxed text-body">
              {PROFILE.about}
            </p>
            <div className="mt-6">
              <a
                href={getOrderTelegramUrl("обсуждение задачи")}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Написать в Telegram — ответ за несколько часов
              </a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="feature-card">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">Образование</p>
                <p className="mt-2 text-sm text-body">{PROFILE.education}</p>
              </div>
              <div className="feature-card">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">График</p>
                <p className="mt-2 text-sm text-body">
                  {PROFILE.workDays}
                  <br />
                  {PROFILE.workHours}
                </p>
              </div>
              <div className="feature-card">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">Сотрудничество</p>
                <p className="mt-2 text-sm text-body">{PROFILE.collaboration.summary}</p>
                <p className="mt-2 text-xs text-muted">{PROFILE.collaboration.detail}</p>
              </div>
            </div>
            <h3 className="mt-10 text-xs font-medium uppercase tracking-widest text-muted">Навыки</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span key={skill} className="badge-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section id="reviews" className="section-band scroll-mt-16 bg-surface-soft">
          <div className="container-editorial">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="display-sm">Отзывы Яндекс Услуги</h2>
                <p className="mt-2 text-sm text-muted">
                  Рейтинг {PROFILE.rating} · {PROFILE.reviewsCount} оценок на{" "}
                  <a href={YANDEX_USLUGI_URL} target="_blank" rel="noreferrer" className="text-link">
                    Яндекс Услуги
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {REVIEWS.map((review) => (
                <article key={review.id} className="feature-card-bordered p-6">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-ink">{review.author}</p>
                    <p className="text-xs text-muted">{review.date}</p>
                  </div>
                  <p className="mt-1 text-primary text-sm">★★★★★</p>
                  <p className="mt-3 text-sm leading-relaxed text-body">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Отзывы Авито */}
        <section id="reviews-avito" className="section-band scroll-mt-16 bg-surface-soft">
          <div className="container-editorial">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="display-sm">Отзывы Авито</h2>
                <p className="mt-2 text-sm text-muted">
                  {AVITO_REVIEWS_COUNT} опубликованных отзывов на{" "}
                  <a href={AVITO_URL} target="_blank" rel="noreferrer" className="text-link">
                    Авито
                  </a>
                  . Ниже — лучшие по проектам AI и автоматизации.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {AVITO_REVIEWS.map((review) => (
                <article key={review.id} className="feature-card-bordered p-6">
                  <p className="text-xs font-medium text-link">{review.listing}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="font-medium text-ink">{review.author}</p>
                    <p className="text-xs text-muted">{review.date}</p>
                  </div>
                  <p className="mt-1 text-primary text-sm">★★★★★</p>
                  <p className="mt-3 text-sm leading-relaxed text-body">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Портфолио */}
        <section id="portfolio" className="section-band scroll-mt-16 bg-surface-soft">
          <div className="container-editorial">
            <h2 className="display-sm">Портфолио</h2>

            {PORTFOLIO.filter((item) => item.featured).map((item) => (
              <article
                key={item.id}
                className="feature-card-bordered mt-10 overflow-hidden p-0 md:grid md:grid-cols-2"
              >
                <div className="relative aspect-[16/10] bg-surface-card md:aspect-auto md:min-h-[320px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 576px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col p-6 md:p-8">
                  <span className="badge-coral w-fit text-[10px]">{item.category}</span>
                  <h3 className="mt-3 font-display text-xl tracking-tight text-ink">{item.title}</h3>
                  {item.priceLabel ? (
                    <p className="mt-2 font-display text-lg tracking-tight text-primary">{item.priceLabel}</p>
                  ) : null}
                  {item.description ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{item.description}</p>
                  ) : null}
                  {item.skills?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="badge-pill text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <Link href={`/portfolio/${item.slug}`} className="btn-primary mt-6 w-fit">
                    Подробнее о проекте
                  </Link>
                </div>
              </article>
            ))}

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PORTFOLIO.filter((item) => !item.featured).map((item) => (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.slug}`}
                  className="feature-card-bordered overflow-hidden p-0 transition active:opacity-90"
                >
                  <div className="relative aspect-[4/3] bg-surface-card">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="badge-coral text-[10px]">{item.category}</span>
                    <h3 className="mt-3 font-medium leading-snug text-ink">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Coral CTA */}
        <section className="section-band">
          <div className="container-editorial">
            <div className="callout-coral">
              <h2 className="font-display text-2xl tracking-tight md:text-3xl">
                Готовы убрать рутину из бизнеса?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-primary/90">
                Опишите задачу — пришлю план автоматизации и фиксированную цену под ваш кейс.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={getOrderTelegramUrl("проект")} target="_blank" rel="noreferrer" className="btn-inverted">
                  Написать в Telegram
                </a>
                <a href="#contact" className="btn-secondary-on-dark">
                  Оставить заявку
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Контакт */}
        <section id="contact" className="section-band scroll-mt-16 border-t border-hairline-soft">
          <div className="container-editorial grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="display-sm">Связаться</h2>
              <p className="mt-4 text-sm leading-relaxed text-body">
                Опишите задачу — пришлю план и сроки. Или напишите напрямую в Telegram.
              </p>
              <div className="mt-6 space-y-2 text-sm">
                <p>
                  <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="text-link font-medium">
                    Telegram
                  </a>
                </p>
                <p>
                  <a href={`tel:${CONTACT_PHONE}`} className="text-link">
                    {CONTACT_PHONE}
                  </a>
                </p>
              </div>
            </div>
            <div className="feature-card-bordered">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
