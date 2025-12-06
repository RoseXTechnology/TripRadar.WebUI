# TripRadar Registration Flow with Telegram Integration

## Complete User Flow Diagram

```mermaid
sequenceDiagram
    participant BD as Bot Developer
    participant BF as @BotFather
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant E as Email Service
    participant T as Telegram

    rect rgb(255, 250, 205)
    Note over BD,BF: PREREQUISITES: One-time Bot Setup (Before Implementation)
    end

    BD->>BF: 1. Open @BotFather in Telegram
    BD->>BF: 2. /mybots → Select @TripRadarBot
    BD->>BF: 3. Bot Settings → Domain
    BD->>BF: 4. Add "tripradar.com"
    BF->>BD: ✅ Domain configured
    Note over BD: 5. Provide to team:<br/>- Bot Username (tripradar_bot)<br/>- Bot Token (for backend .env)
    Note over F: ⚠️ FRONTEND: Add to .env<br/>VITE_TELEGRAM_BOT_USERNAME=tripradar_bot
    Note over B: ⚠️ BACKEND: Add to .env<br/>TELEGRAM_BOT_TOKEN=1234567890:ABC...

    rect rgb(200, 220, 250)
    Note over U,E: СЦЕНАРИЙ 1: Регистрация + Email + Telegram (Happy Path)
    end

    U->>F: 1. Открывает /signup
    U->>F: 2. Вводит email + password + consent
    F->>F: Валидация формы
    F->>B: POST /api/v1/users<br/>{email, password, hasDataStorageConsent}
    B->>B: Создает user<br/>(emailConfirmed=false, username=null)
    B->>B: Генерирует emailToken
    B->>E: Отправляет письмо с ссылкой<br/>https://tripradar.io/confirm-email?token=XXX
    B->>F: 201 Created {message: "Check your email"}
    F->>U: Редирект на /email-sent

    Note over U,E: Пользователь проверяет почту

    U->>E: 3. Открывает письмо
    U->>F: Кликает ссылку /confirm-email?token=XXX
    F->>F: Извлекает token из URL
    F->>B: POST /api/v1/email-confirmations<br/>{token: "XXX"}
    B->>B: Проверяет token
    B->>B: Обновляет user.emailConfirmed = true
    B->>F: 200 OK {success: true, email: "user@example.com"}
    F->>F: Сохраняет email в state
    F->>U: Показывает страницу с Telegram Login Widget

    Note over U,T: Telegram авторизация

    U->>T: 4. Кликает "Login with Telegram"
    T->>U: Открывает Telegram app
    U->>T: Подтверждает авторизацию
    T->>F: Callback: window.onTelegramAuth(data)<br/>{id, first_name, username, auth_date, hash}
    F->>F: Получает telegramData
    F->>B: POST /api/v1/users/link-telegram<br/>{email: "user@example.com", telegramData: {...}}
    B->>B: Находит пользователя по email
    B->>B: Проверяет hash от Telegram<br/>⚠️ BACKEND: Реализовать проверку Telegram hash<br/>(с Bot Token из .env)
    alt Hash невалиден
        B->>F: 403 Forbidden {error: "Invalid Telegram data"}
        F->>U: Показывает ошибку
    else Hash валиден
        B->>B: Сохраняет username из Telegram
        B->>B: Генерирует JWT tokens
        B->>F: 200 OK {accessToken, refreshToken, user}
        F->>F: Сохраняет токены в localStorage
        F->>F: Обновляет auth state
        F->>U: Редирект на /profile (залогинен!)
    end

    rect rgb(250, 220, 200)
    Note over U,T: СЦЕНАРИЙ 2: Пользователь закрыл страницу и пытается залогиниться
    end

    U->>F: 5. Открывает /login
    U->>F: Вводит email + password
    F->>B: POST /api/v1/login<br/>{usernameOrEmail: email, password}
    B->>B: Проверяет credentials
    B->>B: Проверяет: emailConfirmed? username?

    alt Email не подтвержден
        B->>F: 403 {error: "EMAIL_NOT_CONFIRMED"}
        F->>U: "Please confirm your email first"
    else Email подтвержден, но нет username
        B->>F: 403 {error: "TELEGRAM_REQUIRED",<br/>email: "user@example.com"}
        F->>F: Сохраняет email
        F->>U: Показывает Telegram Login Widget
        U->>T: Авторизуется через Telegram
        T->>F: Callback с telegramData
        F->>B: POST /api/v1/users/link-telegram<br/>{email, telegramData}
        B->>B: Проверяет hash
        B->>B: Сохраняет username
        B->>F: 200 OK {accessToken, refreshToken, user}
        F->>U: Залогинен!
    else Все ОК (email confirmed + username exists)
        B->>F: 200 OK {accessToken, refreshToken, user}
        F->>U: Залогинен!
    end
```

## Состояния пользователя

```mermaid
stateDiagram-v2
    [*] --> Registered: POST /api/v1/users
    Registered --> EmailConfirmed: POST /api/v1/email-confirmations
    EmailConfirmed --> FullyActivated: POST /api/v1/users/link-telegram
    FullyActivated --> [*]: User can login

    note right of Registered
        emailConfirmed: false
        username: null
    end note

    note right of EmailConfirmed
        emailConfirmed: true
        username: null
    end note

    note right of FullyActivated
        emailConfirmed: true
        username: "john_doe"
    end note
```

## API Endpoints

### 1. Registration

```
POST /api/v1/users
Body: {
  email: string,
  password: string,
  hasDataStorageConsent: boolean
}
Response: {
  message: "Check your email"
}
```

### 2. Email Confirmation

```
POST /api/v1/email-confirmations
Body: {
  token: string
}
Response: {
  success: true,
  email: string  // email пользователя для связывания с Telegram
}
```

### 3. Link Telegram Account

```
POST /api/v1/users/link-telegram
Body: {
  email: string,
  telegramData: {
    id: number,
    first_name: string,
    last_name?: string,
    username?: string,
    photo_url?: string,
    auth_date: number,
    hash: string
  }
}
Response: {
  accessToken: string,
  refreshToken: string,
  user: {
    username: string,
    email: string,
    ...
  }
}
```

### 4. Login

```
POST /api/v1/login
Body: {
  usernameOrEmail: string,
  password: string
}
Response (Success): {
  accessToken: string,
  refreshToken: string,
  user: {...}
}
Response (Telegram Required): {
  error: "TELEGRAM_REQUIRED",
  email: string
}
Response (Email Not Confirmed): {
  error: "EMAIL_NOT_CONFIRMED"
}
```

## Frontend Routes

```
/signup                              - Форма регистрации
/email-sent                          - "Проверьте почту"
/confirm-email?token=XXX             - Подтверждение + Telegram Widget
/login                               - Логин (может показать Telegram Widget)
/profile                             - После успешного логина
```

## Telegram Login Widget Integration

```html
<script
  async
  src="https://telegram.org/js/telegram-widget.js?22"
  data-telegram-login="YOUR_BOT_USERNAME"
  data-size="large"
  data-onauth="onTelegramAuth(user)"
  data-request-access="write"
></script>

<script>
  function onTelegramAuth(user) {
    // user содержит: id, first_name, last_name, username, photo_url, auth_date, hash
    // Отправляем на backend для проверки hash и связывания аккаунта
  }
</script>
```

## Telegram Bot Setup (For Bot Developer)

### Prerequisites

Разработчику Telegram бота нужно выполнить следующие шаги **один раз**:

### Step 1: Configure Bot Domain

1. Открыть @BotFather в Telegram
2. Отправить команду `/mybots`
3. Выбрать вашего бота (например, @TripRadarBot)
4. Выбрать `Bot Settings` → `Domain`
5. Добавить домен: `tripradar.com` (или ваш production домен)
6. Для разработки также добавить: `localhost` или `dev.tripradar.com`

**Важно:** Это не влияет на работу бота! Бот продолжит работать как раньше.

### Step 2: Provide Credentials to Team

Передать команде разработки:

1. **Bot Username** (например, `tripradar_bot`)
   - Нужен для frontend: отображается в Telegram Login Widget
   - Добавить в `.env` как `VITE_TELEGRAM_BOT_USERNAME=tripradar_bot`

2. **Bot Token** (например, `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)
   - Нужен для backend: проверка hash от Telegram
   - Добавить в backend `.env` как `TELEGRAM_BOT_TOKEN=...`
   - ⚠️ **СЕКРЕТНЫЙ КЛЮЧ** - никогда не коммитить в git!

### Step 3: Verify Setup

После настройки можно проверить:

```bash
# Проверить, что домен добавлен
# Открыть @BotFather → /mybots → ваш бот → Bot Settings → Domain
# Должен быть указан tripradar.com
```

### Diagram: Bot Setup Flow

```mermaid
sequenceDiagram
    participant BD as Bot Developer
    participant BF as @BotFather
    participant Team as Dev Team
    participant FE as Frontend
    participant BE as Backend

    Note over BD,BF: ONE-TIME SETUP

    BD->>BF: /mybots
    BD->>BF: Select @TripRadarBot
    BD->>BF: Bot Settings → Domain
    BD->>BF: Add "tripradar.com"
    BF->>BD: ✅ Domain configured

    BD->>Team: Передает Bot Username<br/>("tripradar_bot")
    BD->>Team: Передает Bot Token<br/>("1234567890:ABC...")

    Team->>FE: Добавляет в .env:<br/>VITE_TELEGRAM_BOT_USERNAME
    Team->>BE: Добавляет в .env:<br/>TELEGRAM_BOT_TOKEN

    Note over FE,BE: READY TO USE
```

### What This Enables

После настройки:

- ✅ Frontend может показывать Telegram Login Widget
- ✅ Пользователи видят знакомое имя бота при логине
- ✅ Backend может проверять подлинность данных от Telegram
- ✅ Бот продолжает работать для других функций (уведомления, команды и т.д.)

### Troubleshooting

**Проблема:** "Bot domain invalid" при попытке логина

- **Решение:** Проверить, что домен добавлен в @BotFather

**Проблема:** "Hash verification failed" на backend

- **Решение:** Проверить, что Bot Token правильный и не истек

**Проблема:** Widget не загружается

- **Решение:** Проверить, что Bot Username правильный в .env

## Security Notes

1. **Hash Verification**: Backend MUST verify Telegram hash using Bot Token
2. **linkToken**: Should expire in 15-30 minutes
3. **emailToken**: Should expire in 24 hours
4. **Bot Token**: NEVER expose on frontend, keep in .env
5. **Domain Whitelist**: Only add trusted domains to bot settings
