/* Applies pending SQL migrations in ./drizzle to DATABASE_URL, in one
   transaction. Drizzle skips anything older than the last applied one.
   Usage: node scripts/migrate.mjs            (uses .env)
          DATABASE_URL=... node scripts/migrate.mjs */
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

if (!process.env.DATABASE_URL) {
  try {
    process.loadEnvFile('.env');
  } catch {}
}
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL must be set');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
try {
  await migrate(drizzle(pool), { migrationsFolder: './drizzle' });
  const { rows } = await pool.query('select count(*)::int n from drizzle.__drizzle_migrations');
  console.log(`Migrations up to date (${rows[0].n} applied).`);
} finally {
  await pool.end();
}
