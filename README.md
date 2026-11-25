# Diagnos Lab

Website, API, staff dashboard and staff app in one pnpm workspace. See `CLAUDE.md` for the layout.

```bash
pnpm install
pnpm dev            # website on :3000
pnpm dev:api        # API
pnpm dev:admin      # dashboard
pnpm dev:mobile     # Expo app
pnpm deploy:website # build and upload the site to Hostinger
```

Each app reads its secrets from its own `.env`; copy `.env.example` to start.
