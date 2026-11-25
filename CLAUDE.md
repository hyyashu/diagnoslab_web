# Diagnos Lab monorepo

pnpm workspace. Run commands from the repo root unless noted.

| Path | What | Deploys to |
|---|---|---|
| `apps/website` | Public site, Next.js static export. Read `apps/website/AGENTS.md` before touching Next code. | Hostinger (`pnpm deploy:website`) |
| `apps/api` | NestJS + Drizzle API: leads (DB, email, Telegram), auth, staff features | Dokploy, root `Dockerfile` |
| `apps/admin` | React + Vite staff dashboard | not deployed yet |
| `apps/mobile` | Expo staff app (see `apps/mobile/CLAUDE.md`) | Expo |
| `packages/*` | Shared Drizzle tables, Zod schemas, API client | — |

Secrets live only in each app's `.env` (gitignored). Never write passwords,
tokens or connection strings into code; add the key to `.env.example`.
