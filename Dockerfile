FROM oven/bun AS base

FROM base AS builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

RUN bun add serve

COPY --from=builder /app/dist ./

CMD ["bun", "serve"]
