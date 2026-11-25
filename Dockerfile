# Build the API app. Build context MUST be the monorepo root (.).
# From repo root: docker build -f Dockerfile .   OR   docker build -f apps/api/Dockerfile .
FROM node:22-alpine AS base

RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

WORKDIR /app

# ── deps: install with full workspace context ─────────────────────────────────
FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json         ./apps/api/
COPY packages/db/package.json      ./packages/db/
COPY packages/schemas/package.json ./packages/schemas/
RUN pnpm install --frozen-lockfile



# ── build: compile TypeScript ─────────────────────────────────────────────────
FROM base AS build
COPY --from=deps /app/node_modules                   ./node_modules
COPY --from=deps /app/apps/api/node_modules           ./apps/api/node_modules
COPY --from=deps /app/packages/db/node_modules        ./packages/db/node_modules
COPY --from=deps /app/packages/schemas/node_modules  ./packages/schemas/node_modules
COPY . .
RUN pnpm run build:packages && pnpm --filter @diagno/api build

# ── production ────────────────────────────────────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Hoisted runtime deps
COPY --from=deps /app/node_modules ./node_modules

# App-level node_modules — contains @diagno/* symlinks pointing to ../../../../packages/*
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules

# Workspace packages: dist + deps (zod, drizzle-orm resolve from each package's node_modules)
COPY --from=build /app/packages/db/dist          ./packages/db/dist
COPY --from=build /app/packages/db/package.json ./packages/db/package.json
COPY --from=deps /app/packages/db/node_modules  ./packages/db/node_modules
COPY --from=build /app/packages/schemas/dist          ./packages/schemas/dist
COPY --from=build /app/packages/schemas/package.json ./packages/schemas/package.json
COPY --from=deps /app/packages/schemas/node_modules  ./packages/schemas/node_modules

# Compiled API output (TypeScript emits to apps/api/dist/ with monorepo-relative paths inside)
COPY --from=build /app/apps/api/dist ./apps/api/dist

# SQL migrations and the runner. The database has no public port, so pending
# migrations are applied here, on start, before the API listens. A failed
# migration stops the start (nothing half-applied: each runs in a transaction).
COPY --from=build /app/apps/api/drizzle ./apps/api/drizzle
COPY --from=build /app/apps/api/scripts/migrate.mjs ./apps/api/scripts/migrate.mjs
COPY --from=build /app/apps/api/package.json ./apps/api/package.json

EXPOSE 3000

CMD ["sh", "-c", "cd apps/api && node scripts/migrate.mjs && cd /app && exec node apps/api/dist/src/main.js"]
