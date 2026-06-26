# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-form.spec.ts >> Форма заявки >> отправляет заявку с заполненными полями и согласиями
- Location: e2e/contact-form.spec.ts:17:7

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - link "Bober AI Dev" [ref=e5] [cursor=pointer]:
          - /url: /
          - img [ref=e6]
          - generic [ref=e8]: Bober AI Dev
        - navigation [ref=e9]:
          - link "Услуги" [ref=e10] [cursor=pointer]:
            - /url: /#services
          - link "Портфолио" [ref=e11] [cursor=pointer]:
            - /url: /#portfolio
          - link "Партнёрам" [ref=e12] [cursor=pointer]:
            - /url: /#partners
          - link "Обо мне" [ref=e13] [cursor=pointer]:
            - /url: /#about
          - link "Отзывы" [ref=e14] [cursor=pointer]:
            - /url: /#reviews
          - link "Контакт" [ref=e15] [cursor=pointer]:
            - /url: /#contact
        - generic [ref=e16]:
          - link "+7 9950998170" [ref=e17] [cursor=pointer]:
            - /url: tel:+79950998170
          - button "Тёмная тема" [ref=e18]:
            - img [ref=e19]
          - link "Написать" [ref=e21] [cursor=pointer]:
            - /url: https://t.me/pstasinski
    - dialog "Партнёрская программа" [ref=e22]:
      - generic [ref=e23]:
        - generic [ref=e25]:
          - generic [ref=e26]:
            - paragraph [ref=e27]: Для агентств и знакомых
            - heading "Партнёрская программа" [level=2] [ref=e28]
          - button "Закрыть" [ref=e29]:
            - generic [ref=e30]: ×
        - generic [ref=e31]:
          - paragraph [ref=e32]:
            - text: Приводите клиентов на AI-проекты —
            - strong [ref=e33]: 10%
            - text: сразу после аванса клиента.
          - list [ref=e34]:
            - listitem [ref=e35]:
              - generic [ref=e36]: "01"
              - generic [ref=e37]:
                - generic [ref=e38]: Рекомендуете.
                - text: Передаёте контакт или знакомите с задачей — AI-бот, автоматизация, внедрение под ключ.
            - listitem [ref=e39]:
              - generic [ref=e40]: "02"
              - generic [ref=e41]:
                - generic [ref=e42]: Клиент вносит аванс.
                - text: Заключаем договор, клиент оплачивает аванс — проект стартует официально.
            - listitem [ref=e43]:
              - generic [ref=e44]: "03"
              - generic [ref=e45]:
                - generic [ref=e46]: Вы получаете 10%.
                - text: Переводим вознаграждение сразу после поступления аванса на наш счёт.
          - list [ref=e47]:
            - listitem [ref=e48]: · Без скрытых условий
            - listitem [ref=e49]: · Прозрачный расчёт от суммы аванса
            - listitem [ref=e50]: · Подходит фрилансерам, агентствам, интеграторам
          - generic [ref=e51]:
            - link "Стать партнёром" [ref=e52] [cursor=pointer]:
              - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20%D0%BF%D0%B0%D1%80%D1%82%D0%BD%D1%91%D1%80%D1%81%D0%BA%D1%83%D1%8E%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%83
            - link "Подробнее на странице" [ref=e53] [cursor=pointer]:
              - /url: /#partners
    - main [ref=e54]:
      - generic [ref=e56]:
        - generic [ref=e57]:
          - paragraph [ref=e58]: Москва и Московская область · Онлайн
          - heading "Разработка AI-агентов и автоматизаций" [level=1] [ref=e59]
          - generic [ref=e60]:
            - generic [ref=e61]: Claude-консультант
            - generic [ref=e62]: Проектировщик ИИ-решений
          - paragraph [ref=e63]: Павел Стасиньский · @pstasinski
          - paragraph [ref=e64]: "Специализация — Claude и автоматизация бизнес-процессов. Больше всего опыта в AI legal tech. Любой проект под ваш запрос: опишите задачу — предложу решение и сроки."
          - generic [ref=e65]:
            - generic [ref=e66]:
              - text: ★ 5.0 · 28 отзывов на
              - link "Яндекс Услуги" [ref=e67] [cursor=pointer]:
                - /url: https://uslugi.yandex.ru/profile/PawelStasinski-254144
            - generic [ref=e68]: "Опыт: 7 лет"
            - generic [ref=e69]: от 30 000 ₽
          - generic [ref=e70]:
            - link "Заказать" [ref=e71] [cursor=pointer]:
              - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E
            - link "Позвонить" [ref=e72] [cursor=pointer]:
              - /url: tel:+79950998170
            - link "Fiverr" [ref=e73] [cursor=pointer]:
              - /url: https://www.fiverr.com/pawelstasinski
          - paragraph [ref=e74]:
            - text: Также на
            - link "Fiverr" [ref=e76] [cursor=pointer]:
              - /url: https://www.fiverr.com/pawelstasinski
            - generic [ref=e77]:
              - text: ·
              - link "Kwork" [ref=e78] [cursor=pointer]:
                - /url: https://kwork.ru/user/pasha_stasinski
            - generic [ref=e79]:
              - text: ·
              - link "FL.ru" [ref=e80] [cursor=pointer]:
                - /url: https://www.fl.ru/user/stasinskipawel/
            - generic [ref=e81]:
              - text: ·
              - link "Авито" [ref=e82] [cursor=pointer]:
                - /url: https://www.avito.ru/moskva/predlozheniya_uslug?q=%D0%B8%D0%B8-%D0%B0%D0%B3%D0%B5%D0%BD%D1%82%D1%8B+%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F+n8n
            - generic [ref=e83]:
              - text: ·
              - link "Freelance.ru" [ref=e84] [cursor=pointer]:
                - /url: https://freelance.ru/fuwiak
            - generic [ref=e85]:
              - text: ·
              - link "Яндекс Услуги" [ref=e86] [cursor=pointer]:
                - /url: https://uslugi.yandex.ru/profile/PawelStasinski-254144
          - paragraph [ref=e87]:
            - text: Персональные данные размещены с согласия субъекта.
            - link "Политика обработки ПДн" [ref=e88] [cursor=pointer]:
              - /url: /privacy-policy
        - img "Павел Стасиньский" [ref=e91]
      - generic [ref=e94]:
        - generic [ref=e95]:
          - generic [ref=e96]: Для агентств и знакомых
          - heading "Партнёрская программа" [level=2] [ref=e97]
          - paragraph [ref=e98]: Приводите клиентов на AI-проекты и получайте фиксированное вознаграждение без долгих ожиданий — выплата сразу после аванса клиента.
          - generic [ref=e99]:
            - article [ref=e100]:
              - text: "01"
              - heading "Рекомендуете" [level=3] [ref=e101]
              - paragraph [ref=e102]: Передаёте контакт или знакомите с задачей — AI-бот, автоматизация, внедрение под ключ.
            - article [ref=e103]:
              - text: "02"
              - heading "Клиент вносит аванс" [level=3] [ref=e104]
              - paragraph [ref=e105]: Заключаем договор, клиент оплачивает аванс — проект стартует официально.
            - article [ref=e106]:
              - text: "03"
              - heading "Вы получаете 10%" [level=3] [ref=e107]
              - paragraph [ref=e108]: Переводим вознаграждение сразу после поступления аванса на наш счёт.
        - complementary [ref=e109]:
          - paragraph [ref=e110]: Вознаграждение
          - paragraph [ref=e111]: 10%
          - paragraph [ref=e112]: 10% от каждого приведённого клиента
          - paragraph [ref=e113]: Выплата сразу после внесения клиентом аванса
          - list [ref=e114]:
            - listitem [ref=e115]: · Без скрытых условий
            - listitem [ref=e116]: · Прозрачный расчёт от суммы аванса
            - listitem [ref=e117]: · Подходит фрилансерам, агентствам, интеграторам
          - link "Стать партнёром" [ref=e118] [cursor=pointer]:
            - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20%D0%BF%D0%B0%D1%80%D1%82%D0%BD%D1%91%D1%80%D1%81%D0%BA%D1%83%D1%8E%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%83
      - generic [ref=e120]:
        - heading "Готовые услуги" [level=2] [ref=e121]
        - paragraph [ref=e122]:
          - text: Фокус —
          - strong [ref=e123]: Claude и автоматизация
          - text: . Готовые пакеты на
          - link "Kwork" [ref=e124] [cursor=pointer]:
            - /url: https://kwork.ru/user/pasha_stasinski
          - text: и
          - link "Fiverr" [ref=e125] [cursor=pointer]:
            - /url: https://www.fiverr.com/pawelstasinski
          - text: . Не нашли подходящий тариф — сделаем проект под ваш запрос. «Купить» открывает заказ в Telegram.
        - generic [ref=e126]:
          - article [ref=e127]:
            - heading "AI-бот — виртуальный ассистент на базе LLM, Rasa, n8n и ElisaOS" [level=3] [ref=e128]
            - paragraph [ref=e129]: "Виртуальный ассистент для бизнеса: диалоги, сценарии, интеграции и автоматизация на стеке LLM + Rasa + n8n."
            - generic [ref=e130]:
              - generic [ref=e131]:
                - paragraph [ref=e132]: 40 000 ₽
                - paragraph [ref=e133]: 14 дн.
              - generic [ref=e134]:
                - link "Подробнее" [ref=e135] [cursor=pointer]:
                  - /url: /services/ai-bot-llm-rasa-n8n
                - link "Купить" [ref=e136] [cursor=pointer]:
                  - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20AI-%D0%B1%D0%BE%D1%82%20%E2%80%94%20%D0%B2%D0%B8%D1%80%D1%82%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D0%B0%D1%81%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BD%D1%82%20%D0%BD%D0%B0%20%D0%B1%D0%B0%D0%B7%D0%B5%20LLM%2C%20Rasa%2C%20n8n%20%D0%B8%20ElisaOS
            - link "Смотреть на Kwork →" [ref=e137] [cursor=pointer]:
              - /url: https://kwork.ru/user/pasha_stasinski
          - article [ref=e138]:
            - heading "Консультации по LLM и AI" [level=3] [ref=e139]
            - paragraph [ref=e140]: "Разбор вашей задачи: выбор модели, архитектура, интеграции, оценка сроков и бюджета внедрения ИИ."
            - generic [ref=e141]:
              - generic [ref=e142]:
                - paragraph [ref=e143]: от 3 000 ₽/час
                - paragraph [ref=e144]: 1 дн.
              - generic [ref=e145]:
                - link "Подробнее" [ref=e146] [cursor=pointer]:
                  - /url: /services/llm-ai-consultation
                - link "Купить" [ref=e147] [cursor=pointer]:
                  - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20%D0%9A%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D0%B8%20%D0%BF%D0%BE%20LLM%20%D0%B8%20AI
            - link "Смотреть на Kwork →" [ref=e148] [cursor=pointer]:
              - /url: https://kwork.ru/user/pasha_stasinski
          - article [ref=e149]:
            - 'heading "Создание AI-бота: GigaChat, LLM, n8n API — локально" [level=3] [ref=e150]'
            - paragraph [ref=e151]: "AI-бот на GigaChat и локальных LLM с n8n API: приватный контур, без утечки данных во внешние сервисы."
            - generic [ref=e152]:
              - generic [ref=e153]:
                - paragraph [ref=e154]: 40 000 ₽
                - paragraph [ref=e155]: 14 дн.
              - generic [ref=e156]:
                - link "Подробнее" [ref=e157] [cursor=pointer]:
                  - /url: /services/ai-bot-gigachat-n8n-local
                - link "Купить" [ref=e158] [cursor=pointer]:
                  - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20AI-%D0%B1%D0%BE%D1%82%D0%B0%3A%20GigaChat%2C%20LLM%2C%20n8n%20API%20%E2%80%94%20%D0%BB%D0%BE%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE
            - link "Смотреть на Kwork →" [ref=e159] [cursor=pointer]:
              - /url: https://kwork.ru/user/pasha_stasinski
          - article [ref=e160]:
            - heading "Консультация по анализу данных и машинному обучению" [level=3] [ref=e161]
            - paragraph [ref=e162]: "Экспресс-разбор задачи ML/AI: данные, модели, метрики, пайплайн. От 10 минут, почасовая оплата."
            - generic [ref=e163]:
              - generic [ref=e164]:
                - paragraph [ref=e165]: от 3 000 ₽/час
                - paragraph [ref=e166]: 1 дн.
              - generic [ref=e167]:
                - link "Подробнее" [ref=e168] [cursor=pointer]:
                  - /url: /services/ml-data-consultation
                - link "Купить" [ref=e169] [cursor=pointer]:
                  - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20%D0%9A%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8F%20%D0%BF%D0%BE%20%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7%D1%83%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B8%20%D0%BC%D0%B0%D1%88%D0%B8%D0%BD%D0%BD%D0%BE%D0%BC%D1%83%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8E
            - link "Смотреть на Kwork →" [ref=e170] [cursor=pointer]:
              - /url: https://kwork.ru/user/pasha_stasinski
          - article [ref=e171]:
            - heading "Разработка бота Telegram, Discord, Mini App на OpenAI" [level=3] [ref=e172]
            - paragraph [ref=e173]: "ИИ-бот для Telegram, Discord или Mini App: диалоги, команды, интеграция с OpenAI и вашими сервисами."
            - generic [ref=e174]:
              - generic [ref=e175]:
                - paragraph [ref=e176]: 40 000 ₽
                - paragraph [ref=e177]: 14 дн.
              - generic [ref=e178]:
                - link "Подробнее" [ref=e179] [cursor=pointer]:
                  - /url: /services/telegram-discord-miniapp-bot
                - link "Купить" [ref=e180] [cursor=pointer]:
                  - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%B1%D0%BE%D1%82%D0%B0%20Telegram%2C%20Discord%2C%20Mini%20App%20%D0%BD%D0%B0%20OpenAI
            - link "Смотреть на Kwork →" [ref=e181] [cursor=pointer]:
              - /url: https://kwork.ru/user/pasha_stasinski
          - article [ref=e182]:
            - heading "Автоматизация бизнеса с помощью Claude" [level=3] [ref=e183]
            - paragraph [ref=e184]: "Внедрение Claude в процессы: отчёты, документы, CRM, уведомления и цепочки задач без ручной рутины."
            - generic [ref=e185]:
              - generic [ref=e186]:
                - paragraph [ref=e187]: от 5 000 ₽/час
                - paragraph [ref=e188]: 7 дн.
              - generic [ref=e189]:
                - link "Подробнее" [ref=e190] [cursor=pointer]:
                  - /url: /services/claude-business-automation
                - link "Купить" [ref=e191] [cursor=pointer]:
                  - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%D0%B0%20%D1%81%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E%20Claude
            - link "Смотреть на Kwork →" [ref=e192] [cursor=pointer]:
              - /url: https://kwork.ru/user/pasha_stasinski
          - article [ref=e193]:
            - heading "AI-агент для создания коммерческих предложений" [level=3] [ref=e194]
            - paragraph [ref=e195]: "Агент собирает КП из CRM и шаблонов: номенклатура, цены, сроки — готовый PDF или документ за минуты."
            - generic [ref=e196]:
              - generic [ref=e197]:
                - paragraph [ref=e198]: 40 000 ₽
                - paragraph [ref=e199]: 10 дн.
              - generic [ref=e200]:
                - link "Подробнее" [ref=e201] [cursor=pointer]:
                  - /url: /services/ai-kp-agent
                - link "Купить" [ref=e202] [cursor=pointer]:
                  - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20AI-%D0%B0%D0%B3%D0%B5%D0%BD%D1%82%20%D0%B4%D0%BB%D1%8F%20%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D1%80%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85%20%D0%BF%D1%80%D0%B5%D0%B4%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9
            - link "Смотреть на Kwork →" [ref=e203] [cursor=pointer]:
              - /url: https://kwork.ru/user/pasha_stasinski
      - generic [ref=e205]:
        - heading "Обо мне" [level=2] [ref=e206]
        - paragraph [ref=e207]: "Помогаю бизнесу убирать рутину и ускорять продажи через Claude и автоматизацию. Внедряю агентов и n8n-воркфлоу, которые сами обрабатывают лиды, собирают КП, обновляют CRM и ведут клиента по воронке — без копипаста между вкладками. Чаще всего заказывают: AI-ассистенты для команды, автоматизацию документов, интеграции с amoCRM, Bitrix24 и мессенджерами. Любую задачу беру под запрос — от быстрой консультации до полного внедрения в production. 7 лет в AI, партнёр Yandex Cloud, Cloud.ru и Selectel. Фиксированная смета, поэтапная сдача, проекты от 30 000 ₽. Напишите в Telegram — отвечу в течение нескольких часов и предложу план с ценой."
        - link "Написать в Telegram — ответ за несколько часов" [ref=e209] [cursor=pointer]:
          - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20%D0%BE%D0%B1%D1%81%D1%83%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8
        - generic [ref=e210]:
          - generic [ref=e211]:
            - paragraph [ref=e212]: Образование
            - paragraph [ref=e213]: University of Warsaw — Physics and Neuroscience
          - generic [ref=e214]:
            - paragraph [ref=e215]: График
            - paragraph [ref=e216]:
              - text: любой день недели
              - text: 0:00–23:00
          - generic [ref=e217]:
            - paragraph [ref=e218]: Сотрудничество
            - paragraph [ref=e219]: Опишите задачу в Telegram — ответ и смета в течение суток.
            - paragraph [ref=e220]: "Под ключ: от брифа до внедрения, документация и передача решения. Фиксированная цена или почасово."
        - heading "Навыки" [level=3] [ref=e221]
        - generic [ref=e222]:
          - generic [ref=e223]: Claude и Anthropic API
          - generic [ref=e224]: Автоматизация бизнес-процессов
          - generic [ref=e225]: AI-агенты для бизнеса
          - generic [ref=e226]: n8n-воркфлоу
          - generic [ref=e227]: LLM-интеграции
          - generic [ref=e228]: RAG и корпоративная база знаний
          - generic [ref=e229]: КП и коммерческие документы
          - generic [ref=e230]: Обработка лидов и воронка продаж
          - generic [ref=e231]: "CRM: amoCRM, Bitrix24"
          - generic [ref=e232]: Telegram и мессенджеры для бизнеса
          - generic [ref=e233]: Внутренние ассистенты
          - generic [ref=e234]: Интеграции API и веб-сервисов
          - generic [ref=e235]: Документооборот и отчёты
          - generic [ref=e236]: YandexGPT и GigaChat
          - generic [ref=e237]: Yandex Cloud
      - generic [ref=e239]:
        - generic [ref=e241]:
          - heading "Отзывы Яндекс Услуги" [level=2] [ref=e242]
          - paragraph [ref=e243]:
            - text: Рейтинг 5 · 28 оценок на
            - link "Яндекс Услуги" [ref=e244] [cursor=pointer]:
              - /url: https://uslugi.yandex.ru/profile/PawelStasinski-254144
        - generic [ref=e245]:
          - article [ref=e246]:
            - generic [ref=e247]:
              - paragraph [ref=e248]: Ольга
              - paragraph [ref=e249]: 20.10.2025
            - paragraph [ref=e250]: ★★★★★
            - paragraph [ref=e251]: Павел — ас своего дела! Всё на высшем уровне, всегда на связи, оперативно отвечал на вопросы. Чувствовалось, что ему важен результат.
          - article [ref=e252]:
            - generic [ref=e253]:
              - paragraph [ref=e254]: Евгения М.
              - paragraph [ref=e255]: 25.07.2025
            - paragraph [ref=e256]: ★★★★★
            - paragraph [ref=e257]: Невероятный специалист. Откликнулся сразу, на протяжении всего процесса был на связи, работа выполнена качественно в минимальные сроки.
          - article [ref=e258]:
            - generic [ref=e259]:
              - paragraph [ref=e260]: yu
              - paragraph [ref=e261]: 10.07.2024
            - paragraph [ref=e262]: ★★★★★
            - paragraph [ref=e263]: Всегда на связи, оперативно отвечал на письма и звонки, вносил правки. Работа выполнена качественно и в срок. Рекомендую!
          - article [ref=e264]:
            - generic [ref=e265]:
              - paragraph [ref=e266]: Егор Хохлов
              - paragraph [ref=e267]: 13.06.2024
            - paragraph [ref=e268]: ★★★★★
            - paragraph [ref=e269]: Очень хороший преподаватель, оперативно решил проблему, пошёл на встречу — успешно сдал работу.
          - article [ref=e270]:
            - generic [ref=e271]:
              - paragraph [ref=e272]: Аля Бартель
              - paragraph [ref=e273]: 25.04.2024
            - paragraph [ref=e274]: ★★★★★
            - paragraph [ref=e275]: Быстро и понятно разъяснял сложности проекта, даже в выходные и вечером был на связи.
          - article [ref=e276]:
            - generic [ref=e277]:
              - paragraph [ref=e278]: Доминика
              - paragraph [ref=e279]: 22.04.2024
            - paragraph [ref=e280]: ★★★★★
            - paragraph [ref=e281]: Помог с проектом быстро и качественно, результат есть. Спасибо!
          - article [ref=e282]:
            - generic [ref=e283]:
              - paragraph [ref=e284]: Алексей Карманников
              - paragraph [ref=e285]: 24.03.2024
            - paragraph [ref=e286]: ★★★★★
            - paragraph [ref=e287]: Объёмно проконсультировал по кластеризации данных. Вопросов не осталось.
          - article [ref=e288]:
            - generic [ref=e289]:
              - paragraph [ref=e290]: Терентьев Николай
              - paragraph [ref=e291]: 05.12.2023
            - paragraph [ref=e292]: ★★★★★
            - paragraph [ref=e293]: Отличный исполнитель, всё в срок, чётко и правильно. Всегда на связи, рекомендую!
      - generic [ref=e295]:
        - generic [ref=e297]:
          - heading "Отзывы Авито" [level=2] [ref=e298]
          - paragraph [ref=e299]:
            - text: 39 опубликованных отзывов на
            - link "Авито" [ref=e300] [cursor=pointer]:
              - /url: https://www.avito.ru/moskva/predlozheniya_uslug?q=%D0%B8%D0%B8-%D0%B0%D0%B3%D0%B5%D0%BD%D1%82%D1%8B+%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F+n8n
            - text: . Ниже — лучшие по проектам AI и автоматизации.
        - generic [ref=e301]:
          - article [ref=e302]:
            - paragraph [ref=e303]: ИИ-агенты, чат-боты, автоматизация n8n, OpenClaw
            - generic [ref=e304]:
              - paragraph [ref=e305]: Артём
              - paragraph [ref=e306]: 16 февраля 2026
            - paragraph [ref=e307]: ★★★★★
            - paragraph [ref=e308]: Сделано всё как положено, рекомендую!
          - article [ref=e309]:
            - paragraph [ref=e310]: ИИ-агенты, автоматизация n8n, amoCRM, Битрикс
            - generic [ref=e311]:
              - paragraph [ref=e312]: Денис Павлов
              - paragraph [ref=e313]: 11 ноября 2025
            - paragraph [ref=e314]: ★★★★★
            - paragraph [ref=e315]: Был запрос сделать агента ChatGPT в Telegram — результат устроил. Отвечал на всех этапах, держал в курсе до финала и остался на связи после.
          - article [ref=e316]:
            - paragraph [ref=e317]: ИИ-агенты, автоматизация n8n, amoCRM, Битрикс
            - generic [ref=e318]:
              - paragraph [ref=e319]: Ольга
              - paragraph [ref=e320]: 22 октября 2025
            - paragraph [ref=e321]: ★★★★★
            - paragraph [ref=e322]: Павел — отличный специалист по ML, профессионал! Всегда на связи, оперативно решал вопросы. Очень ответственный и доброжелательный — от всей души рекомендую!
          - article [ref=e323]:
            - paragraph [ref=e324]: Репетитор Python, ИИ, LLM, машинное обучение
            - generic [ref=e325]:
              - paragraph [ref=e326]: Григорий
              - paragraph [ref=e327]: 22 октября 2025
            - paragraph [ref=e328]: ★★★★★
            - paragraph [ref=e329]: Специалист в своём деле! Конкурентов не нашёл. Скорость на уровне. Павел искренне подошёл к задаче, всё выполнил в срок. Рекомендую!
          - article [ref=e330]:
            - paragraph [ref=e331]: Настройка AI-автоматизации на Zapier или n8n
            - generic [ref=e332]:
              - paragraph [ref=e333]: Елена
              - paragraph [ref=e334]: 27 августа 2025
            - paragraph [ref=e335]: ★★★★★
            - paragraph [ref=e336]: Обращались для создания CRM — остались очень довольны. Разобрался в специфике нашей работы, предложил решения, которые отлично подошли. Сдал в срок, интерфейс понятен, работа с клиентами стала проще.
          - article [ref=e337]:
            - paragraph [ref=e338]: Настройка AI-автоматизации на Zapier или n8n
            - generic [ref=e339]:
              - paragraph [ref=e340]: Надежда
              - paragraph [ref=e341]: 24 августа 2025
            - paragraph [ref=e342]: ★★★★★
            - paragraph [ref=e343]: Нужна была помощь в настройке n8n. Павел быстро ответил, посмотрел в чём дело и исправил. Оплата после работы, когда убедилась, что всё работает. Однозначно рекомендую!
          - article [ref=e344]:
            - paragraph [ref=e345]: Репетитор Python, ИИ, LLM, машинное обучение
            - generic [ref=e346]:
              - paragraph [ref=e347]: ИП Артюхин
              - paragraph [ref=e348]: 22 июля 2025
            - paragraph [ref=e349]: ★★★★★
            - paragraph [ref=e350]: Крутой спец. Своё дело знает. Вопросов и претензий нет — всё чётко.
          - article [ref=e351]:
            - paragraph [ref=e352]: Репетитор Python, Data Science, Machine Learning
            - generic [ref=e353]:
              - paragraph [ref=e354]: Андрей
              - paragraph [ref=e355]: 4 октября 2021
            - paragraph [ref=e356]: ★★★★★
            - paragraph [ref=e357]: Доработка кода нейросети для прогнозирования рядов данных. Павел — компетентный и увлечённый специалист с богатым опытом в Deep Learning. С моими проблемами помог разобраться полностью.
      - generic [ref=e359]:
        - heading "Портфолио" [level=2] [ref=e360]
        - article [ref=e361]:
          - img "Yandex Telemost Agent — ИИ-помощник для встреч и продаж" [ref=e363]
          - generic [ref=e364]:
            - generic [ref=e365]: Искусственный интеллект
            - heading "Yandex Telemost Agent — ИИ-помощник для встреч и продаж" [level=3] [ref=e366]
            - paragraph [ref=e367]: 300 000 ₽
            - paragraph [ref=e368]: ИИ-помощник для встреч и продаж, который во время созвона автоматически фиксирует ключевые договорённости, делает расшифровку разговора и помогает не терять важные детали общения с клиентом.
            - generic [ref=e369]:
              - generic [ref=e370]: 1С
              - generic [ref=e371]: Bitrix
              - generic [ref=e372]: JavaScript
              - generic [ref=e373]: YandexGPT
              - generic [ref=e374]: Интеграция модели ИИ
            - link "Подробнее о проекте" [ref=e375] [cursor=pointer]:
              - /url: /portfolio/yandex-telemost-agent
        - article [ref=e376]:
          - img "Собираем лиды из рекламы и мессенджеров, учимся на поведении клиентов" [ref=e378]
          - generic [ref=e379]:
            - generic [ref=e380]: Искусственный интеллект
            - heading "Собираем лиды из рекламы и мессенджеров, учимся на поведении клиентов" [level=3] [ref=e381]
            - paragraph [ref=e382]: 300 000 ₽
            - paragraph [ref=e383]: Заявки разъезжаются по Google, VK, Telegram, Profi.ru и Avito. Клиенты пропадают, менеджеры забывают перезвонить — деньги уходят конкуренту. GTM Flow собирает всё в одном окне и ведёт клиента от первого сообщения до оплаты.
            - generic [ref=e384]:
              - generic [ref=e385]: LLM-агенты
              - generic [ref=e386]: Telegram
              - generic [ref=e387]: VK
              - generic [ref=e388]: CRM
              - generic [ref=e389]: n8n
              - generic [ref=e390]: Интеграция модели ИИ
            - link "Подробнее о проекте" [ref=e391] [cursor=pointer]:
              - /url: /portfolio/lead-generation
        - article [ref=e392]:
          - img "Автоматизация формирования коммерческих предложений на основе LLM" [ref=e394]
          - generic [ref=e395]:
            - generic [ref=e396]: ИТ и разработка
            - heading "Автоматизация формирования коммерческих предложений на основе LLM" [level=3] [ref=e397]
            - paragraph [ref=e398]: 300 000 ₽
            - paragraph [ref=e399]: "Интернет-магазин крепежа и метизов: менеджеры вручную собирали КП — поиск цен и SKU в каталоге, верстка Word/PDF, НДС и валюта для разных стран (Польша, PLN + 23% VAT)."
            - generic [ref=e400]:
              - generic [ref=e401]: MySQL
              - generic [ref=e402]: LLM
              - generic [ref=e403]: JavaScript
              - generic [ref=e404]: Python
              - generic [ref=e405]: Интеграция модели ИИ
            - link "Подробнее о проекте" [ref=e406] [cursor=pointer]:
              - /url: /portfolio/kp-llm-automation
        - article [ref=e407]:
          - img "ELIA Suite — AI-платформа с изолированными воркспейсами для партнёров и поставщиков на базе Claude и OpenClaw" [ref=e409]
          - generic [ref=e410]:
            - generic [ref=e411]: Искусственный интеллект
            - heading "ELIA Suite — AI-платформа с изолированными воркспейсами для партнёров и поставщиков на базе Claude и OpenClaw" [level=3] [ref=e412]
            - paragraph [ref=e413]: Сеть партнёров и поставщиков работала через публичные AI-сервисы — без изоляции данных, контроля ответов и связи с внутренними системами. Заказы, цены и техдокументация обрабатывались вручную.
            - generic [ref=e414]:
              - generic [ref=e415]: Claude
              - generic [ref=e416]: OpenClaw
              - generic [ref=e417]: JavaScript
              - generic [ref=e418]: Интеграция модели ИИ
              - generic [ref=e419]: CRM
            - link "Подробнее о проекте" [ref=e420] [cursor=pointer]:
              - /url: /portfolio/elia-suite
        - generic [ref=e421]:
          - link "AI-помощник для консультантов Kaspersky Искусственный интеллект AI-помощник для консультантов Kaspersky Линия поддержки и отдел продаж Kaspersky обрабатывали сотни однотипных вопросов о лицензиях, совместимости и тарифах. Консультанты тратили время на поиск в базе знаний вместо сложных кейсов." [ref=e422] [cursor=pointer]:
            - /url: /portfolio/kaspersky-ai-assistant
            - img "AI-помощник для консультантов Kaspersky" [ref=e424]
            - generic [ref=e425]:
              - generic [ref=e426]: Искусственный интеллект
              - heading "AI-помощник для консультантов Kaspersky" [level=3] [ref=e427]
              - paragraph [ref=e428]: Линия поддержки и отдел продаж Kaspersky обрабатывали сотни однотипных вопросов о лицензиях, совместимости и тарифах. Консультанты тратили время на поиск в базе знаний вместо сложных кейсов.
          - 'link "CRM + Telegram-бот + Google Sheets для B2B ИТ и разработка CRM + Telegram-бот + Google Sheets для B2B B2B-компания вела заказы в разрозненных таблицах и переписке в Telegram: менеджеры дублировали статусы, теряли заявки и не видели единую воронку." [ref=e429] [cursor=pointer]':
            - /url: /portfolio/crm-telegram-sheets
            - img "CRM + Telegram-бот + Google Sheets для B2B" [ref=e431]
            - generic [ref=e432]:
              - generic [ref=e433]: ИТ и разработка
              - heading "CRM + Telegram-бот + Google Sheets для B2B" [level=3] [ref=e434]
              - paragraph [ref=e435]: "B2B-компания вела заказы в разрозненных таблицах и переписке в Telegram: менеджеры дублировали статусы, теряли заявки и не видели единую воронку."
          - 'link "AI-бот для дизайнеров интерьера в Telegram и MAX Искусственный интеллект AI-бот для дизайнеров интерьера в Telegram и MAX Студия дизайна интерьера получала однотипные запросы: подбор стиля, палитры, мебели и сметы. Дизайнеры отвлекались на первичную консультацию вместо проектной работы." [ref=e436] [cursor=pointer]':
            - /url: /portfolio/interior-design-bot
            - img "AI-бот для дизайнеров интерьера в Telegram и MAX" [ref=e438]
            - generic [ref=e439]:
              - generic [ref=e440]: Искусственный интеллект
              - heading "AI-бот для дизайнеров интерьера в Telegram и MAX" [level=3] [ref=e441]
              - paragraph [ref=e442]: "Студия дизайна интерьера получала однотипные запросы: подбор стиля, палитры, мебели и сметы. Дизайнеры отвлекались на первичную консультацию вместо проектной работы."
          - 'link "Анализ социальных медиа в реальном времени Искусственный интеллект Анализ социальных медиа в реальном времени Маркетинговой команде нужен был мониторинг упоминаний бренда и конкурентов в соцсетях: вручную собирали посты и комментарии, реакция на инфоповоды запаздывала на часы." [ref=e443] [cursor=pointer]':
            - /url: /portfolio/social-media-analytics
            - img "Анализ социальных медиа в реальном времени" [ref=e445]
            - generic [ref=e446]:
              - generic [ref=e447]: Искусственный интеллект
              - heading "Анализ социальных медиа в реальном времени" [level=3] [ref=e448]
              - paragraph [ref=e449]: "Маркетинговой команде нужен был мониторинг упоминаний бренда и конкурентов в соцсетях: вручную собирали посты и комментарии, реакция на инфоповоды запаздывала на часы."
          - 'link "OCR — извлечение текста из документов ИТ и разработка OCR — извлечение текста из документов Бухгалтерия и юристы обрабатывали сканы счетов, актов и договоров вручную: операторы переносили реквизиты и суммы в учётные системы, накапливались ошибки и задержки." [ref=e450] [cursor=pointer]':
            - /url: /portfolio/ocr-text-extraction
            - img "OCR — извлечение текста из документов" [ref=e452]
            - generic [ref=e453]:
              - generic [ref=e454]: ИТ и разработка
              - heading "OCR — извлечение текста из документов" [level=3] [ref=e455]
              - paragraph [ref=e456]: "Бухгалтерия и юристы обрабатывали сканы счетов, актов и договоров вручную: операторы переносили реквизиты и суммы в учётные системы, накапливались ошибки и задержки."
      - generic [ref=e459]:
        - heading "Готовы убрать рутину из бизнеса?" [level=2] [ref=e460]
        - paragraph [ref=e461]: Опишите задачу — пришлю план автоматизации и фиксированную цену под ваш кейс.
        - generic [ref=e462]:
          - link "Написать в Telegram" [ref=e463] [cursor=pointer]:
            - /url: https://t.me/pstasinski?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%3A%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82
          - link "Оставить заявку" [ref=e464] [cursor=pointer]:
            - /url: "#contact"
      - generic [ref=e466]:
        - generic [ref=e467]:
          - heading "Связаться" [level=2] [ref=e468]
          - paragraph [ref=e469]: Опишите задачу — пришлю план и сроки. Или напишите напрямую в Telegram.
          - generic [ref=e470]:
            - paragraph [ref=e471]:
              - link "Telegram" [ref=e472] [cursor=pointer]:
                - /url: https://t.me/pstasinski
            - paragraph [ref=e473]:
              - link "+79950998170" [ref=e474] [cursor=pointer]:
                - /url: tel:+79950998170
        - generic [ref=e476]:
          - generic [ref=e477]:
            - generic [ref=e478]: Имя
            - textbox "Имя" [ref=e479]: Тестовый Клиент
          - generic [ref=e480]:
            - generic [ref=e481]: Телефон или email
            - textbox [ref=e482]: test@example.com
          - generic [ref=e483]:
            - generic [ref=e484]: Услуга
            - textbox "Услуга" [ref=e485]:
              - /placeholder: "Например: ИИ-бот под ключ"
              - text: ИИ-бот под ключ
          - generic [ref=e486]:
            - generic [ref=e487]: Сообщение
            - textbox "Сообщение" [ref=e488]: Нужен бот для поддержки клиентов.
          - generic [ref=e489]:
            - generic [ref=e490]:
              - checkbox "Я ознакомлен(а) с политикой обработки персональных данных." [checked] [ref=e491]
              - generic [ref=e492]:
                - text: Я ознакомлен(а) с
                - link "политикой обработки персональных данных" [ref=e493] [cursor=pointer]:
                  - /url: /privacy-policy
                - text: .
            - generic [ref=e494]:
              - checkbox "Я даю согласие на обработку персональных данных." [checked] [ref=e495]
              - generic [ref=e496]:
                - text: Я даю
                - link "согласие на обработку персональных данных" [ref=e497] [cursor=pointer]:
                  - /url: /consent
                - text: .
          - button "Отправить заявку" [ref=e498]
          - paragraph [ref=e499]: RESEND_API_KEY не настроен на сервере
    - contentinfo [ref=e500]:
      - generic [ref=e501]:
        - generic [ref=e502]:
          - img [ref=e503]
          - generic [ref=e505]: Bober AI Dev
        - paragraph [ref=e506]: ИП Стасиньски Павел Кшиштоф · ИНН 772356334324 · ОГРНИП 325774600389226
        - generic [ref=e507]:
          - link "Политика обработки ПДн" [ref=e508] [cursor=pointer]:
            - /url: /privacy-policy
          - link "Согласие на обработку ПДн" [ref=e509] [cursor=pointer]:
            - /url: /consent
          - link "Telegram" [ref=e510] [cursor=pointer]:
            - /url: https://t.me/pstasinski
          - link "Freelance.ru" [ref=e511] [cursor=pointer]:
            - /url: https://freelance.ru/fuwiak
          - link "FL.ru" [ref=e512] [cursor=pointer]:
            - /url: https://www.fl.ru/user/stasinskipawel/
          - link "Авито" [ref=e513] [cursor=pointer]:
            - /url: https://www.avito.ru/moskva/predlozheniya_uslug?q=%D0%B8%D0%B8-%D0%B0%D0%B3%D0%B5%D0%BD%D1%82%D1%8B+%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F+n8n
          - link "Kwork" [ref=e514] [cursor=pointer]:
            - /url: https://kwork.ru/user/pasha_stasinski
          - link "Fiverr" [ref=e515] [cursor=pointer]:
            - /url: https://www.fiverr.com/pawelstasinski
          - link "Яндекс Услуги" [ref=e516] [cursor=pointer]:
            - /url: https://uslugi.yandex.ru/profile/PawelStasinski-254144
          - link "+79950998170" [ref=e517] [cursor=pointer]:
            - /url: tel:+79950998170
        - paragraph [ref=e518]: © 2026 Bober AI Dev
  - button "Open Next.js Dev Tools" [ref=e524] [cursor=pointer]:
    - img [ref=e525]
  - alert [ref=e528]
```

# Test source

```ts
  1  | import { expect, test, type Page } from "@playwright/test";
  2  | 
  3  | async function dismissCookieBanner(page: Page) {
  4  |   await page.addInitScript(() => {
  5  |     localStorage.setItem("cookie-consent", "accepted");
  6  |   });
  7  | }
  8  | 
  9  | test.describe("Форма заявки", () => {
  10 |   test.beforeEach(async ({ page }) => {
  11 |     await dismissCookieBanner(page);
  12 |     await page.goto("/#contact");
  13 |     await expect(page.getByRole("heading", { name: "Связаться" })).toBeVisible();
  14 |     await expect(page.locator("form input#contact")).toBeVisible();
  15 |   });
  16 | 
  17 |   test("отправляет заявку с заполненными полями и согласиями", async ({ page }) => {
  18 |     const form = page.locator("form").filter({ has: page.locator("#name") });
  19 | 
  20 |     await form.locator("#name").fill("Тестовый Клиент");
  21 |     await form.locator("input#contact").fill("test@example.com");
  22 |     await form.locator("#service").fill("ИИ-бот под ключ");
  23 |     await form.locator("#message").fill("Нужен бот для поддержки клиентов.");
  24 | 
  25 |     await form.locator("#pd-policy").check();
  26 |     await form.locator("#pd-consent").check();
  27 | 
  28 |     const submit = form.getByRole("button", { name: "Отправить заявку" });
  29 |     await expect(submit).toBeEnabled();
  30 | 
  31 |     const responsePromise = page.waitForResponse(
  32 |       (response) => response.url().includes("/api/contact") && response.request().method() === "POST",
  33 |     );
  34 | 
  35 |     await submit.click();
  36 | 
  37 |     const response = await responsePromise;
> 38 |     expect(response.ok()).toBeTruthy();
     |                           ^ Error: expect(received).toBeTruthy()
  39 |     await expect(response.json()).resolves.toMatchObject({ ok: true });
  40 | 
  41 |     await expect(page.getByText("Заявка отправлена. Свяжемся в ближайшее время.")).toBeVisible();
  42 |     await expect(form.locator("#name")).toHaveValue("");
  43 |     await expect(form.locator("input#contact")).toHaveValue("");
  44 |     await expect(form.locator("#message")).toHaveValue("");
  45 |     await expect(form.locator("#pd-policy")).not.toBeChecked();
  46 |     await expect(form.locator("#pd-consent")).not.toBeChecked();
  47 |   });
  48 | 
  49 |   test("не даёт отправить без согласий", async ({ page }) => {
  50 |     const form = page.locator("form").filter({ has: page.locator("#name") });
  51 | 
  52 |     await form.locator("#name").fill("Тест");
  53 |     await form.locator("input#contact").fill("+7 900 000-00-00");
  54 | 
  55 |     const submit = form.getByRole("button", { name: "Отправить заявку" });
  56 |     await expect(submit).toBeDisabled();
  57 |   });
  58 | 
  59 |   test("API отклоняет заявку без обязательных полей", async ({ request }) => {
  60 |     const response = await request.post("/api/contact", {
  61 |       data: {
  62 |         name: "",
  63 |         contact: "",
  64 |         policyAccepted: true,
  65 |         consent: true,
  66 |       },
  67 |     });
  68 | 
  69 |     expect(response.status()).toBe(400);
  70 |     await expect(response.json()).resolves.toMatchObject({
  71 |       error: "invalid_payload",
  72 |       message: "Заполните обязательные поля",
  73 |     });
  74 |   });
  75 | });
  76 | 
```