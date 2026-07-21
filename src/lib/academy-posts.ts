export type AcademyPost = {
  slug: string;
  title: string;
  summary: string;
  /** Короткий лид под заголовком (Habr-style). */
  lead: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  coverImage: string;
  /** Краткие шаги для HowTo JSON-LD. */
  steps: string[];
  /** Шпаргалка команд в конце статьи. */
  commands: string[];
  /** Важная оговорка / pitfalls. */
  note?: string;
  /** Полный HTML тела статьи (секции, списки, pre). */
  contentHtml: string;
};

export const ACADEMY_POSTS: AcademyPost[] = [
  {
    slug: "install-yaga",
    title: "Установка yaga и первый запуск TUI",
    summary:
      "Собираем модульный Yandex CLI из репозитория Bober AI: Go 1.22+, npm run yaga:install, doctor и первый взгляд на bricks.",
    lead: "yaga (Яга) — внутренний CLI Bober AI на том же стеке, что и bober: Go и Charm Bubble Tea. Каждый сервис Яндекса — отдельный brick. Это не официальный инструмент Яндекса, а практикум по работе с API из нашего репозитория.",
    publishedAt: "2026-07-20",
    readingTime: "12 мин",
    tags: ["yaga", "CLI", "TUI", "установка"],
    coverImage: "/stock/automation-code.jpg",
    steps: [
      "Установите Go 1.22+, в корне репозитория выполните npm run yaga:install.",
      "Запустите yaga без аргументов — откроется TUI.",
      "Проверьте окружение командой yaga doctor.",
      "Посмотрите bricks: yaga bricks · при необходимости yaga profile public.",
    ],
    commands: [
      "npm run yaga:install",
      "yaga",
      "yaga version",
      "yaga doctor",
      "yaga bricks",
      "yaga help",
      "yaga profile public",
    ],
    note: "Секреты и config живут в ~/.config/yaga/. Не коммитьте credentials.env. Практикум внутренний — не путайте с официальной документацией Яндекса.",
    contentHtml: `
      <p>Если вы уже клонировали <code>bober-ai</code>, рядом с сайтом лежит каталог <code>cli/yaga</code>. Там же — <code>install.sh</code>, Go-бинарник и bricks, которые дергают скрипты из <code>scripts/*.mjs</code>. Ниже — рабочий путь от нуля до осмысленного TUI, без выдуманных флагов.</p>

      <h2>Зачем отдельный CLI</h2>
      <p>Вебмастер, Метрика, Cloud, Диск, Wordstat, Direct и GPT живут в разных консолях и OAuth-потоках. В yaga они собраны как bricks в <code>bricks.go</code> (<code>allBricks()</code>): у каждого свой <code>ID</code>, видимость <code>public | owner</code> и функция <code>Run</code>. Профили прячут private-функции, чтобы на общей машине не светить Direct/GPT/Wordstat.</p>
      <blockquote>Сервис = brick. Профиль = что видно. Credentials = что реально открывает API.</blockquote>

      <h2>Требования</h2>
      <ul>
        <li><strong>Go 1.22+</strong> — сборка бинаря и <code>go run</code> через лаунчер.</li>
        <li>Клон репозитория с корнем, где есть <code>package.json</code> и скрипт <code>yaga:install</code>.</li>
        <li><code>~/bin</code> (или каталог из <code>YAGA_BIN_DIR</code>) в <code>PATH</code>, чтобы команда <code>yaga</code> находилась из любой директории.</li>
      </ul>
      <p>Внешние бинари вроде <code>yc</code> или <code>yandex-disk</code> нужны только для соответствующих bricks. Их отсутствие не мешает установить сам yaga — <code>doctor</code> просто покажет пробелы.</p>

      <h2>Установка</h2>
      <p>В корне репозитория:</p>
      <pre><code>npm run yaga:install</code></pre>
      <p>Скрипт <code>cli/yaga/install.sh</code> делает три вещи: собирает Go-бинарник в <code>cli/yaga/yaga</code>, делает исполняемым <code>cli/yaga/run</code> и создаёт симлинк <code>$YAGA_BIN_DIR/yaga → …/run</code> (по умолчанию <code>~/bin/yaga</code>). Лаунчер <code>run</code> выставляет <code>YAGA_REPO</code> на корень репозитория и либо запускает собранный бинарь, либо падает в <code>go run .</code>.</p>
      <p>После установки скрипт печатает версию и короткий список bricks. Ожидайте что-то вроде:</p>
      <pre><code>installed: /Users/…/bin/yaga → …/cli/yaga/run (Go + Bubble Tea)
yaga 0.2.0 (go+tui)
ok — yaga  |  yaga help  |  yaga profile public</code></pre>

      <h2>Первый запуск: TUI</h2>
      <p>Без аргументов открывается dashboard на Bubble Tea:</p>
      <pre><code>yaga</code></pre>
      <p>Вкладки:</p>
      <ul>
        <li><strong>1 Bricks</strong> — список klocek, Enter запускает default-команду brick.</li>
        <li><strong>2 Creds</strong> — ввод секретов и ссылки на UI Яндекса (<code>Enter</code> — значение, <code>o</code> — открыть UI, <code>d</code> — удалить).</li>
        <li><strong>3 Doctor</strong> — токены и внешние binaries.</li>
        <li><strong>4 Output</strong> — результат последнего запуска.</li>
        <li><strong>5 Help</strong> — краткая справка.</li>
      </ul>
      <p>Навигация: <code>Tab</code> / стрелки, <code>Enter</code>, <code>q</code> — выход. Это удобно, когда ещё не помните подкоманды наизусть.</p>

      <h2>Doctor и список bricks</h2>
      <pre><code>yaga doctor
yaga bricks
yaga help</code></pre>
      <p><code>doctor</code> сводит наличие ключей из <code>~/.config/yaga/credentials.env</code> и бинарей вроде <code>yc</code>. <code>bricks</code> показывает, какие klocek видны при текущем профиле (<code>●</code> / <code>○</code>). <code>help</code> печатает profile, путь config и список видимых bricks с описаниями.</p>

      <h3>Профиль public на чужой машине</h3>
      <p>Если нужно отдать терминал коллеге без owner-bricks:</p>
      <pre><code>yaga profile public</code></pre>
      <p>Останутся public-bricks (webmaster, metrika, cloud, disk и т.д.). Direct, Wordstat, GPT и прочие owner-элементы скроются. Конфиг пишется в <code>~/.config/yaga/config.json</code>; образец — <code>cli/yaga/config.example.json</code>.</p>

      <h2>Типичные сбои</h2>
      <ul>
        <li><strong>command not found: yaga</strong> — <code>~/bin</code> нет в <code>PATH</code>, либо install не запускали.</li>
        <li><strong>Go слишком старый</strong> — обновите toolchain до 1.22+.</li>
        <li><strong>Brick «не видит» репозиторий</strong> — лаунчер должен стартовать из установленного <code>run</code>, чтобы <code>YAGA_REPO</code> указывал на корень с <code>scripts/</code>.</li>
        <li><strong>Пустой doctor</strong> — нормально до OAuth; сначала поставьте ClientID/secret и сделайте обмен (см. статью про OAuth).</li>
      </ul>

      <h2>Что дальше</h2>
      <p>Следующий логичный шаг — получить access token для Вебмастера: ClientID и secret сами по себе API не открывают. Затем имеет смысл прогнать <code>yaga webmaster status</code> и SEO-чеклист. Если делите машину — сразу зафиксируйте <code>profile public</code>.</p>
    `,
  },
  {
    slug: "oauth-clientid-vs-token",
    title: "OAuth для Вебмастера: ClientID ≠ access token",
    summary:
      "Разбираем частую ошибку: сохранить Client ID/secret и ждать, что API заработает. Нужен access token y0_… через yaga webmaster oauth.",
    lead: "В yaga почти каждый «API не отвечает» начинается одинаково: в credentials лежат ClientID и Client secret, а access token так и не появился. Вебмастер ждёт токен вида y0_… — и точка.",
    publishedAt: "2026-07-20",
    readingTime: "11 мин",
    tags: ["OAuth", "Webmaster", "credentials"],
    coverImage: "/stock/cyber-padlock.jpg",
    steps: [
      "Создайте приложение на oauth.yandex.ru и скопируйте ClientID + Client secret.",
      "Сохраните их через yaga credentials set …",
      "Один раз выполните yaga webmaster oauth — обмен code → token.",
      "Проверьте yaga credentials и yaga webmaster status.",
    ],
    commands: [
      "yaga credentials",
      "yaga credentials set YANDEX_WEBMASTER_CLIENT_ID <id>",
      "yaga credentials set YANDEX_WEBMASTER_CLIENT_SECRET <secret>",
      "yaga webmaster oauth",
      "yaga credentials open YANDEX_WEBMASTER_OAUTH_TOKEN",
      "yaga webmaster status",
    ],
    note: "Секреты хранятся в ~/.config/yaga/credentials.env с правами 0600. Не добавляйте файл, token или Client Secret в Git и скриншоты.",
    contentHtml: `
      <p>Документация Яндекса и наш <code>cli/yaga/README.md</code> говорят одно и то же: <strong>ClientID + Client secret ≠ access token</strong>. Первый шаг — зарегистрировать приложение, второй — один раз обменять authorization code на token. yaga автоматизирует второй шаг командой <code>yaga webmaster oauth</code>.</p>

      <h2>Что лежит в credentials</h2>
      <p>Файл по умолчанию: <code>~/.config/yaga/credentials.env</code> (путь можно переопределить через <code>YAGA_CREDENTIALS</code>). Спецификации ключей описаны в <code>credentials.go</code>. Для Вебмастера важны:</p>
      <ul>
        <li><code>YANDEX_WEBMASTER_CLIENT_ID</code> — идентификатор приложения (это не token).</li>
        <li><code>YANDEX_WEBMASTER_CLIENT_SECRET</code> — нужен для exchange code → token.</li>
        <li><code>YANDEX_WEBMASTER_OAUTH_TOKEN</code> — access token, которым реально ходят скрипты.</li>
        <li><code>YANDEX_WEBMASTER_REFRESH_TOKEN</code> — пишется автоматически после успешного oauth exchange.</li>
      </ul>
      <p>Список ключей и ссылок на UI:</p>
      <pre><code>yaga credentials</code></pre>
      <p>В TUI на вкладке Creds те же сущности: Enter вводит значение, <code>o</code> открывает URL консоли Яндекса.</p>

      <h2>Шаг 1. Приложение на oauth.yandex.ru</h2>
      <ol>
        <li>Откройте <a href="https://oauth.yandex.ru/client/">oauth.yandex.ru → Мои приложения</a>.</li>
        <li>Создайте приложение с правами, нужными Вебмастеру.</li>
        <li>Скопируйте ClientID и Client secret.</li>
      </ol>
      <p>На этом этапе у вас ещё нет токена API. Есть только «дверь» и «ключ от двери» — но не пропуск внутрь.</p>

      <h2>Шаг 2. Сохранить ClientID/secret в yaga</h2>
      <pre><code>yaga credentials set YANDEX_WEBMASTER_CLIENT_ID &lt;id&gt;
yaga credentials set YANDEX_WEBMASTER_CLIENT_SECRET &lt;secret&gt;</code></pre>
      <p>Значения попадают в <code>credentials.env</code>. Не коммитьте этот файл и не вставляйте secret в issue/чат.</p>

      <h2>Шаг 3. Один раз обменять code на token</h2>
      <pre><code>yaga webmaster oauth</code></pre>
      <p>Brick <code>webmaster</code> вызывает скрипт <code>yandex-webmaster-oauth.mjs</code>. Обычно открывается браузер: вы логинитесь, подтверждаете доступ, получаете code, CLI обменивает его и записывает <code>YANDEX_WEBMASTER_OAUTH_TOKEN</code> (и refresh при наличии). Алиасы той же подкоманды в коде: <code>login</code>, <code>auth</code>.</p>
      <blockquote>Если после oauth в credentials всё ещё только ClientID/secret — обмен не завершился. Повторите oauth и смотрите вывод в Output / терминале.</blockquote>

      <h2>Шаг 4. Проверка</h2>
      <pre><code>yaga credentials
yaga webmaster status</code></pre>
      <p><code>status</code> (алиас brick: <code>wm</code>) тянет снимок Вебмастер + Метрика через <code>yandex-status.mjs</code>. Если токен валиден и хост настроен — увидите данные, а не 401/403.</p>
      <p>Открыть UI, связанный с ключом:</p>
      <pre><code>yaga credentials open YANDEX_WEBMASTER_OAUTH_TOKEN</code></pre>

      <h2>Частые ловушки</h2>
      <ul>
        <li><strong>«Я уже вставил ClientID»</strong> — без oauth exchange API Вебмастера не заработает.</li>
        <li><strong>Путаница с общим <code>YANDEX_OAUTH_TOKEN</code></strong> — в specs он связан с Метрикой; для Вебмастера целевой ключ — <code>YANDEX_WEBMASTER_OAUTH_TOKEN</code>.</li>
        <li><strong>Скриншот credentials.env</strong> — токен <code>y0_…</code> = полный доступ к API. Считайте его паролем.</li>
        <li><strong>Права файла</strong> — yaga пишет credentials с режимом 0600; не ослабляйте права «для удобства».</li>
      </ul>

      <h2>Итог</h2>
      <p>Модель простая: приложение даёт ClientID/secret → <code>yaga webmaster oauth</code> один раз → дальше bricks ходят с access token. Дальше — SEO-чеклист и аккуратный recrawl без сжигания дневной квоты.</p>
    `,
  },
  {
    slug: "webmaster-seo-checklist",
    title: "SEO-чеклист Яндекс Вебмастера через yaga",
    summary:
      "Как снять статус, ИКС, диагностику, индекс и запросы одной цепочкой команд brick webmaster — без ручного кликанья по кабинету.",
    lead: "Brick webmaster в yaga — тонкая обёртка над скриптами репозитория: status, seo, feed, mirrors, repair, recrawl, oauth. Ниже — порядок обхода, который мы используем в практикуме перед правками сайта.",
    publishedAt: "2026-07-20",
    readingTime: "13 мин",
    tags: ["SEO", "Webmaster", "ИКС", "чеклист"],
    coverImage: "/stock/roadmap-sticky-notes.jpg",
    steps: [
      "Снимите общий статус: yaga webmaster status.",
      "Прогоните чеклист позиций: yaga webmaster seo.",
      "Перед переобходом проверьте квоту: yaga webmaster recrawl --quota.",
      "При необходимости посмотрите feed и mirrors.",
    ],
    commands: [
      "yaga webmaster status",
      "yaga wm status",
      "yaga webmaster seo",
      "yaga webmaster recrawl --quota",
      "yaga webmaster feed",
      "yaga webmaster mirrors",
      "yaga webmaster repair",
    ],
    note: "Отчёт читает данные API и не меняет настройки сайта (кроме feed/mirrors/repair/recrawl, которые пишут в API по назначению). «Зелёный» чеклист не гарантирует индексацию или высокую позицию.",
    contentHtml: `
      <p>В <code>bricks.go</code> у webmaster такая справка: <code>status | seo | feed | mirrors | repair | recrawl | oauth</code>. Алиас brick — <code>wm</code>. Тяжёлая логика остаётся в <code>scripts/*.mjs</code>; Go только маршрутизирует подкоманды.</p>

      <h2>С чего начать: status</h2>
      <pre><code>yaga webmaster status
# то же:
yaga wm status</code></pre>
      <p>Подкоманда по умолчанию — <code>status</code> (если вызвать просто <code>yaga webmaster</code>). Скрипт <code>yandex-status.mjs</code> даёт снимок Вебмастер + Метрика: удобная «температура» хоста перед глубоким разбором.</p>

      <h2>Чеклист позиций: seo</h2>
      <pre><code>yaga webmaster seo</code></pre>
      <p>Алиасы в коде: <code>positions</code>, <code>rank</code>. Скрипт <code>yandex-webmaster-seo.mjs</code> собирает то, что в README сформулировано как чеклист позиций:</p>
      <ul>
        <li>ИКС (SQI),</li>
        <li>диагностика,</li>
        <li>индекс,</li>
        <li>важные URL,</li>
        <li>запросы.</li>
      </ul>
      <p>Это read-oriented проход: вы читаете API, а не «чините SEO кнопкой». Интерпретация — ваша: что чинить на сайте, что в разметке, что просто ждать переобхода.</p>

      <h2>Квота перед любым recrawl</h2>
      <pre><code>yaga webmaster recrawl --quota</code></pre>
      <p>Суточный лимит переобхода конечен. Практикумная привычка: сначала quota, потом URL. Подробности и pitfalls — в отдельной статье про безопасный переобход.</p>

      <h2>Фид и зеркала</h2>
      <pre><code>yaga webmaster feed
yaga webmaster mirrors
yaga webmaster repair</code></pre>
      <ul>
        <li><code>feed</code> — загрузка performers feed (<code>yandex-webmaster-feed.mjs</code>).</li>
        <li><code>mirrors</code> — настройки зеркал.</li>
        <li><code>repair</code> — helper перезагрузки фида (<code>yandex-feed-repair.mjs</code>).</li>
      </ul>
      <p>Эти команды уже <em>пишут</em> в API. Не гоняйте их «для проверки» на проде без необходимости — в отличие от <code>status</code>/<code>seo</code>.</p>

      <h2>Рекомендуемый порядок в практикуме</h2>
      <ol>
        <li><code>yaga doctor</code> — есть ли token.</li>
        <li><code>yaga webmaster status</code> — общий снимок.</li>
        <li><code>yaga webmaster seo</code> — чеклист.</li>
        <li>Правки на сайте / в sitemap / robots.</li>
        <li><code>yaga webmaster recrawl --quota</code> → точечный recrawl изменённых URL.</li>
        <li>Через время снова <code>seo</code> / кабинет Вебмастера — не ждите мгновенного чуда.</li>
      </ol>

      <h2>Ограничения чеклиста</h2>
      <ul>
        <li>Нет критических ошибок ≠ страница в топе.</li>
        <li>ИКС меняется медленно; один deploy его не «прокачает».</li>
        <li>Важные URL и запросы зависят от того, что API отдаёт для вашего hostId.</li>
        <li>Это внутренний практикум Bober AI, не курс Академии Яндекса.</li>
      </ul>

      <h2>Итог</h2>
      <p>Держите в голове три режима brick webmaster: читать (<code>status</code>/<code>seo</code>), писать осознанно (<code>feed</code>/<code>mirrors</code>/<code>repair</code>/<code>recrawl</code>), один раз авторизоваться (<code>oauth</code>). Для ежедневной рутины хватает status → seo → quota.</p>
    `,
  },
  {
    slug: "safe-recrawl",
    title: "Безопасный переобход страницы в Вебмастере",
    summary:
      "Как не сжечь дневную квоту: проверка HTTP 200 и canonical, yaga webmaster recrawl --quota, затем точечная отправка URL.",
    lead: "Переобход сообщает роботу, что URL стоит пересмотреть. Он не назначает срок индексации и не поднимает позицию. Зато квоту тратит сразу — поэтому в практикуме есть жёсткий ритуал «сначала quota».",
    publishedAt: "2026-07-20",
    readingTime: "10 мин",
    tags: ["recrawl", "индексация", "квота"],
    coverImage: "/stock/office-tower.jpg",
    steps: [
      "Убедитесь, что URL отдаёт 200, не закрыт в robots и с верным canonical.",
      "Проверьте квоту: yaga webmaster recrawl --quota.",
      "Отправьте полный URL: yaga webmaster recrawl <url>.",
      "Дождитесь обработки и проверьте статус в кабинете Вебмастера.",
    ],
    commands: [
      "curl -I https://www.bober-ai.dev/academy",
      "yaga webmaster recrawl --quota",
      "yaga webmaster recrawl https://www.bober-ai.dev/academy",
      "yaga webmaster recrawl https://www.bober-ai.dev/academy https://www.bober-ai.dev/services",
    ],
    note: "Квота приходит из Webmaster API и может отличаться между сайтами. Успешный task_id ≠ страница уже в поиске.",
    contentHtml: `
      <p>Скрипт <code>scripts/yandex-webmaster-recrawl.mjs</code> принимает либо флаг квоты, либо один/несколько URL. Обёртка в yaga:</p>
      <pre><code>yaga webmaster recrawl --quota
yaga webmaster recrawl https://www.bober-ai.dev/academy</code></pre>
      <p>Алиас подкоманды в Go: <code>crawl</code>. Внутри — <code>getRecrawlQuota</code> / <code>submitRecrawl</code> из <code>scripts/lib/yandex-webmaster.mjs</code>.</p>

      <h2>Перед отправкой в API</h2>
      <p>Роботу бесполезно слать URL, который сам себе противоречит:</p>
      <ul>
        <li>HTTP 200 (не 301-петля, не 404, не soft-404).</li>
        <li>Страница не запрещена в <code>robots.txt</code>.</li>
        <li>Canonical указывает на тот URL, который вы хотите видеть в индексе.</li>
        <li>В sitemap — актуальная запись, если вы на него опираетесь.</li>
      </ul>
      <pre><code>curl -I https://www.bober-ai.dev/academy</code></pre>
      <p>Смотрите статус, <code>location</code> при редиректах и заголовки кеша. Если отдаёте другую версию хоста (www / non-www) — сначала зеркала (<code>yaga webmaster mirrors</code>), потом recrawl.</p>

      <h2>Квота — обязательный шаг</h2>
      <pre><code>yaga webmaster recrawl --quota</code></pre>
      <p>Скрипт печатает хост и что-то вроде «осталось N · суточная M». Флаг <code>--quota</code> (или аргумент <code>quota</code>) завершает работу без submit. Привычка практикума: не слать пачку URL «на всякий случай» в пятницу вечером.</p>

      <h2>Отправка одного или нескольких URL</h2>
      <pre><code>yaga webmaster recrawl https://www.bober-ai.dev/academy
yaga webmaster recrawl https://www.bober-ai.dev/academy https://www.bober-ai.dev/services</code></pre>
      <p>При успехе в stdout будет <code>task_id</code> и остаток квоты. Ошибка по одному URL не должна удивлять: хост/токен/формат URL проверяются API, не «магией CLI».</p>

      <h2>Чего recrawl не делает</h2>
      <ul>
        <li>Не гарантирует индексацию.</li>
        <li>Не задаёт ETA появления в выдаче.</li>
        <li>Не заменяет правки контента, title, перелинковки.</li>
        <li>Не лечит Disallow и кривой canonical.</li>
      </ul>
      <blockquote>Считайте recrawl сигналом «пересмотри этот URL», а не кнопкой «заставь ранжироваться».</blockquote>

      <h2>После отправки</h2>
      <ol>
        <li>Зафиксируйте <code>task_id</code> из вывода.</li>
        <li>Через время проверьте обход/индекс в кабинете Вебмастера.</li>
        <li>Повторите <code>yaga webmaster seo</code>, если смотрите динамику чеклиста.</li>
        <li>Не долбите тот же URL пачкой запросов — квота общая на хост.</li>
      </ol>

      <h2>Итог</h2>
      <p>Ритуал короткий: проверить страницу → <code>--quota</code> → один точный URL → ждать. Так вы сохраняете квоту для реальных релизов и не создаёте себе ложное ощущение, что «API уже всё продвинул».</p>
    `,
  },
  {
    slug: "profiles-and-bricks",
    title: "Профили yaga и видимость bricks",
    summary:
      "owner, public и custom: как спрятать Direct/GPT/Wordstat на общей машине и управлять списком через yaga bricks hide|enable.",
    lead: "На одной машине удобно держать полный owner-набор. На демо или чужом ноутбуке — только public bricks. Вся развилка сидит в ~/.config/yaga/config.json и командах profile / bricks.",
    publishedAt: "2026-07-22",
    readingTime: "11 мин",
    tags: ["bricks", "profile", "безопасность"],
    coverImage: "/stock/team-collab.jpg",
    steps: [
      "Посмотрите текущий список: yaga bricks.",
      "Для чужого окружения: yaga profile public.",
      "Точечно спрячьте brick: yaga bricks hide <id>.",
      "Вернитесь к полному набору: yaga profile owner.",
    ],
    commands: [
      "yaga bricks",
      "yaga bricks list",
      "yaga profile public",
      "yaga profile owner",
      "yaga bricks hide gpt",
      "yaga bricks unhide gpt",
      "yaga bricks enable direct",
      "yaga bricks disable direct",
      "YAGA_PROFILE=public yaga",
    ],
    note: "Профиль меняет видимость команд, но не удаляет secrets из credentials.env. Перед демо всё равно проверьте, что в Output/экране нет токенов.",
    contentHtml: `
      <p>В README yaga профили описаны коротко: <code>owner</code> — всё, <code>public</code> — только <code>visibility: public</code>, <code>custom</code> — ручные enable/disable/hide. Образец конфига — <code>cli/yaga/config.example.json</code>.</p>

      <h2>Какие bricks бывают</h2>
      <p><code>allBricks()</code> в <code>bricks.go</code> регистрирует, среди прочего:</p>
      <ul>
        <li><strong>public:</strong> core, webmaster, metrika, cloud, disk, …</li>
        <li><strong>owner:</strong> wordstat, direct, и другие private klocek (GPT / AI Studio и т.д. — по разметке Visibility в коде).</li>
      </ul>
      <p>Список с учётом профиля:</p>
      <pre><code>yaga bricks
yaga bricks list</code></pre>
      <p>Маркеры <code>●</code> / <code>○</code> — видно / скрыто. Справка по модели — <code>yaga core</code>.</p>

      <h2>profile public на общей машине</h2>
      <pre><code>yaga profile public</code></pre>
      <p>После этого Direct/Wordstat/owner-инструменты не торчат в TUI и CLI (для текущего config). Альтернатива без записи в файл — переменная окружения из help:</p>
      <pre><code>YAGA_PROFILE=public yaga</code></pre>
      <p>Вернуться к полному набору:</p>
      <pre><code>yaga profile owner</code></pre>

      <h2>Точечные hide / enable</h2>
      <p>Команды из <code>main.go</code>:</p>
      <pre><code>yaga bricks hide gpt
yaga bricks unhide gpt
yaga bricks enable direct
yaga bricks disable direct</code></pre>
      <p><code>enable</code>/<code>disable</code>/<code>hide</code>/<code>unhide</code> переводят профиль в <code>custom</code> и правят массивы в config. Это удобно, когда public слишком груб, а один brick всё же нужно убрать с глаз.</p>

      <h2>Где лежит config</h2>
      <p>По умолчанию <code>~/.config/yaga/config.json</code>. Поля из example: <code>profile</code>, <code>enabled</code>, <code>disabled</code>, <code>hidden</code>. Комментарий в example прямо говорит: <code>profile=public</code>, чтобы шарить машину без Direct/GPT/Wordstat.</p>

      <h2>Безопасность демо</h2>
      <ul>
        <li>Скрытие brick ≠ отзыв OAuth token.</li>
        <li>Вкладка Creds и файл credentials остаются на диске.</li>
        <li>Перед стримом/скрином прогоните <code>yaga doctor</code> глазами: не светите пути с токенами.</li>
        <li>Для постоянного «учебного» режима держите отдельный user OS или отдельный <code>YAGA_CREDENTIALS</code>.</li>
      </ul>

      <h2>Итог</h2>
      <p>Профили — это UX и гигиена демо, а не замена секрет-менеджменту. Для практикума запомните два жеста: <code>yaga profile public</code> перед чужими руками и <code>yaga bricks hide …</code>, когда нужно вырезать один klocek.</p>
    `,
  },
  {
    slug: "metrika-status",
    title: "Метрика из CLI: status, counter и YTM",
    summary:
      "Brick metrika в yaga: снимок счётчика, counter и статус Yandex Tag Manager — какие ключи нужны и как не перепутать токены.",
    lead: "После Вебмастера логичный второй public-brick — metrika. Три подкоманды, несколько ключей в credentials и типичная путаница между общим OAuth и отдельным токеном Метрики.",
    publishedAt: "2026-07-22",
    readingTime: "10 мин",
    tags: ["Metrika", "YTM", "analytics"],
    coverImage: "/stock/office-interior.jpg",
    steps: [
      "Проверьте ключи: yaga credentials и yaga doctor.",
      "Снимите статус: yaga metrika status.",
      "При необходимости: yaga metrika counter и yaga metrika ytm.",
      "Сверьте ID счётчика с NEXT_PUBLIC_YANDEX_METRIKA_ID.",
    ],
    commands: [
      "yaga credentials",
      "yaga doctor",
      "yaga metrika status",
      "yaga metrika counter",
      "yaga metrika ytm",
      "yaga ym status",
    ],
    note: "Права приложения должны покрывать metrika:read (и то, что вы реально вызываете). Отдельный YANDEX_METRIKA_OAUTH_TOKEN опционален — см. credentials.go.",
    contentHtml: `
      <p>В <code>bricks.go</code> brick <code>metrika</code> (алиасы <code>metrica</code>, <code>ym</code>) принимает <code>status | counter | ytm</code>. Default — <code>status</code>. Скрипты: <code>yandex-metrika-status.mjs</code>, <code>yandex-metrika-counter.mjs</code>, <code>yandex-ytm-status.mjs</code>.</p>

      <h2>Какие credentials смотреть</h2>
      <p>Из <code>allCredSpecs()</code> для Метрики фигурируют:</p>
      <ul>
        <li><code>YANDEX_OAUTH_TOKEN</code> — общий access token (в how-to указан путь через webmaster oauth / oauth.yandex.ru).</li>
        <li><code>YANDEX_METRIKA_OAUTH_TOKEN</code> — опциональный отдельный токен с правами Метрики.</li>
        <li><code>NEXT_PUBLIC_YANDEX_METRIKA_ID</code> — числовой ID счётчика (как в кабинете / URL списка счётчиков).</li>
      </ul>
      <pre><code>yaga credentials
yaga doctor</code></pre>
      <p>Если doctor ругается на отсутствие token — не начинайте с counter: сначала OAuth и права приложения.</p>

      <h2>status</h2>
      <pre><code>yaga metrika status
yaga ym status</code></pre>
      <p>Базовый снимок: жив ли доступ и что отдаёт API для текущего контекста. Это аналог «открыть кабинет и глазами проверить», только из терминала — удобно в CI-привычках и перед релизом тегов.</p>

      <h2>counter</h2>
      <pre><code>yaga metrika counter</code></pre>
      <p>Работа со счётчиком через <code>yandex-metrika-counter.mjs</code>. Имеет смысл, когда нужно убедиться, что ID и настройки совпадают с тем, что зашито в сайт (<code>NEXT_PUBLIC_YANDEX_METRIKA_ID</code>).</p>

      <h2>ytm</h2>
      <pre><code>yaga metrika ytm
# алиас подкоманды: tag</code></pre>
      <p>Статус Yandex Tag Manager / теговой обвязки через <code>yandex-ytm-status.mjs</code>. Полезно после правок контейнера: CLI не заменяет UI YTM, но быстро показывает, отвалился ли доступ.</p>

      <h2>Связка с Вебмастером</h2>
      <p><code>yaga webmaster status</code> уже включает метрический срез в общем снимке. Brick metrika нужен, когда копаете аналитику отдельно: счётчик, YTM, права токена. Не смешивайте в голове ClientID Вебмастера и ID счётчика Метрики — это разные сущности.</p>

      <h2>Типичные ошибки</h2>
      <ul>
        <li>Токен без scope Метрики → 403, хотя Вебмастер работает.</li>
        <li>В env сайта один ID, в credentials — другой.</li>
        <li>Ожидание, что <code>status</code> «починит» дубли счётчиков на странице — нет, это read/ops helper.</li>
      </ul>

      <h2>Итог</h2>
      <p>Минимальный контур практикума по Метрике: credentials/doctor → <code>metrika status</code> → при необходимости <code>counter</code>/<code>ytm</code>. Вместе с webmaster seo это закрывает «поиск + аналитика» без открытия десяти вкладок кабинета.</p>
    `,
  },
];

export function getAcademyPost(slug: string): AcademyPost | undefined {
  return ACADEMY_POSTS.find((post) => post.slug === slug);
}
