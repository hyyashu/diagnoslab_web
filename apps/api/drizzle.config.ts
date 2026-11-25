import type { Config } from 'drizzle-kit';

/* drizzle-kit does not read .env itself. */
try {
  process.loadEnvFile('.env');
} catch {
  /* no .env: DATABASE_URL must come from the environment */
}

export default {
  schema: '../../packages/db/src/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
