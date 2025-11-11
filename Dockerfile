# ---------- STAGE 1: build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Копируем package.json и lock
COPY package.json pnpm-lock.yaml ./

# 2. Устанавливаем зависимости (все, включая dev)
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

# 3. Копируем весь проект
COPY . .

# 4. Сборка TypeScript
RUN pnpm run build

# 5. Генерация Prisma Client для сборки (для ESM)
RUN npx prisma generate

# ---------- STAGE 2: runtime ----------
FROM node:20-alpine

WORKDIR /app

# 1. Копируем package.json и lock
COPY package.json pnpm-lock.yaml ./

# 2. Устанавливаем только production зависимости
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile --prod

# 3. Копируем артефакты сборки и Prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma/seeds ./prisma/seeds
COPY --from=builder /app/node_modules ./node_modules

# 4. НЕ запускаем seed на этапе build
# Prisma Client будет сгенерирован на этапе runtime автоматически при первом импорте

# CMD для запуска приложения
# Миграции и seed выполняются уже с DATABASE_URL из docker-compose
CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx prisma/seeds/prisma.seed.ts && node dist/cmd/app/index.mjs"]
