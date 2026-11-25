/* One-time fill-in after migration 0002: phone_e164, channel, campaign,
   interest and people for existing leads, plus a "created" timeline entry
   per lead. Safe to run again: it recomputes the same values and never
   duplicates people or timeline entries.

   Run after building:  node dist/src/db/backfill/leads.backfill.js
   (DATABASE_URL from the environment or apps/api/.env) */
import { Pool } from 'pg';
import { deriveAttribution, deriveInterest, normalizePhone } from '../../routes/leads/lead-derive';

type Row = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  source: unknown;
  created_at: Date;
};

async function main() {
  if (!process.env.DATABASE_URL) {
    try {
      process.loadEnvFile('.env');
    } catch {
      /* falls through to the check below */
    }
  }
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL must be set');

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = await pool.connect();
  try {
    await db.query('begin');
    const { rows } = await db.query<Row>('select id, name, email, phone, source, created_at from leads order by created_at, id');

    /* People: one per phone number, named after the latest enquiry. */
    const people = new Map<string, { name: string | null; email: string | null; first: Date }>();
    for (const r of rows) {
      const e164 = normalizePhone(r.phone);
      if (!e164) continue;
      const p = people.get(e164) ?? { name: null, email: null, first: r.created_at };
      if (r.name?.trim()) p.name = r.name.trim();
      if (r.email?.trim()) p.email = r.email.trim();
      people.set(e164, p);
    }
    for (const [e164, p] of people) {
      await db.query(
        `insert into people (name, phone_e164, email, created_at, updated_at) values ($1, $2, $3, $4, now())
         on conflict (phone_e164) do update set name = coalesce(excluded.name, people.name),
           email = coalesce(excluded.email, people.email), updated_at = now()`,
        [p.name, e164, p.email, p.first],
      );
    }

    for (const r of rows) {
      const e164 = normalizePhone(r.phone);
      const a = deriveAttribution(r.source);
      const i = deriveInterest(r.source);
      await db.query(
        `update leads set phone_e164 = $2,
           person_id = (select id from people where phone_e164 = $2),
           channel = $3, is_paid = $4, campaign = $5, keyword = $6, landing_page = $7,
           click_id = $8, click_id_type = $9,
           interest_kind = $10, interest_name = $11, interest_price = $12
         where id = $1`,
        [r.id, e164, a.channel, a.isPaid, a.campaign, a.keyword, a.landingPage, a.clickId, a.clickIdType, i.interestKind, i.interestName, i.interestPrice],
      );
      await db.query(
        `insert into lead_activities (lead_id, type, data, created_at)
         select $1, 'created', $2::jsonb, $3
         where not exists (select 1 from lead_activities where lead_id = $1 and type = 'created')`,
        [r.id, JSON.stringify({ channel: a.channel }), r.created_at],
      );
    }

    await db.query('commit');

    const summary = await db.query(
      `select channel, count(*)::int n, count(*) filter (where is_paid)::int paid from leads group by channel order by n desc`,
    );
    const counts = await db.query(
      `select (select count(*) from people)::int people,
              (select count(*) from leads where person_id is null)::int no_person,
              (select count(*) from leads where interest_kind is not null)::int with_interest,
              (select count(*) from lead_activities)::int activities`,
    );
    console.log('Backfill done.', counts.rows[0]);
    console.table(summary.rows);
  } catch (e) {
    await db.query('rollback');
    throw e;
  } finally {
    db.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error('Backfill failed, nothing changed:', e instanceof Error ? e.message : e);
  process.exit(1);
});
