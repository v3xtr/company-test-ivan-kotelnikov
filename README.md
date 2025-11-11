Простой backend на Node.js + TypeScript с использованием Prisma и PostgreSQL.  
Проект контейнеризован с помощью Docker и управляется через Docker Compose.

## Стек технологий

- Node.js 20 (ESM)
- TypeScript
- Prisma ORM
- PostgreSQL 16
- Docker & Docker Compose
- PNPM для управления пакетами

## Быстрый старт

### 1. Клонируем репозиторий

```bash
git clone <репозиторий>
cd company-test
```

### 2. Настраиваем окружение

Создайте .env файл или используйте переменные из docker-compose.yml.
Обязательная переменная:

```bash
DATABASE_URL=postgresql://postgres:postgres@db:5432/test?schema=public
PORT=8000
NODE_ENV=production
```

### 3. Сборка и запуск через Docker

docker-compose build
docker-compose up

Приложение будет доступно на http://localhost:8000

### 4. Работа с Prisma

```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

## Структура проекта
```bash
├── cmd/
│   └── app/
├── prisma/
│   ├── schema.prisma
│   └── seeds/
├── src/
├── dist/
├── package.json
├── pnpm-lock.yaml
├── Dockerfile
└── docker-compose.yml
```

## Команды PNPM

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm start
```
