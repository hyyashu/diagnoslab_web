FROM node:22-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# ── deps: install with full workspace context ─────────────────────────────────
# Build context must be the monorepo root: docker build -f apps/api/Dockerfile .
FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json         ./apps/api/
COPY packages/db/package.json      ./packages/db/
COPY packages/schemas/package.json ./packages/schemas/
RUN pnpm install --frozen-lockfile --ignore-scripts=false
RUN pnpm approve-builds



# ── build: compile TypeScript ─────────────────────────────────────────────────
FROM base AS build
COPY --from=deps /app/node_modules          ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY . .
RUN pnpm --filter @diagno/api build

# ── production ────────────────────────────────────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Hoisted runtime deps
COPY --from=deps /app/node_modules ./node_modules

# App-level node_modules — contains @diagno/* symlinks pointing to ../../../../packages/*
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules

# Workspace package sources — required because @diagno/* symlinks resolve here at runtime
COPY packages/db/src          ./packages/db/src
COPY packages/db/package.json ./packages/db/package.json
COPY packages/schemas/src          ./packages/schemas/src
COPY packages/schemas/package.json ./packages/schemas/package.json

# Compiled API output (TypeScript emits to apps/api/dist/ with monorepo-relative paths inside)
COPY --from=build /app/apps/api/dist ./apps/api/dist

EXPOSE 3000

CMD ["node", "apps/api/dist/apps/api/src/main.js"]
