-- Access control: staff status and session versions, push owners, and the
-- new permission list (packages/schemas/src/access.ts). Role defaults now
-- live in code; role_permissions is no longer used and is emptied.
-- Safe to re-run.

ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "session_version" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "last_login_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'front_desk';--> statement-breakpoint
UPDATE "users" SET "role" = 'front_desk' WHERE "role" = 'user';--> statement-breakpoint

ALTER TABLE "web_push_subscriptions" ADD COLUMN IF NOT EXISTS "user_id" integer REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint

DELETE FROM "role_permissions";--> statement-breakpoint
DELETE FROM "user_permissions";--> statement-breakpoint
DELETE FROM "permissions";--> statement-breakpoint
INSERT INTO "permissions" ("name", "description") VALUES
  ('leads:read:all', 'See all leads'),
  ('leads:read:own', 'See leads assigned to them'),
  ('leads:work', 'Work leads: call, note, follow-up, status, book'),
  ('leads:assign', 'Assign leads to staff'),
  ('leads:revenue', 'See revenue totals (₹)'),
  ('leads:create', 'Add leads by hand'),
  ('attendance:self', 'Check in and out, see own attendance'),
  ('attendance:read:all', 'See everyone''s attendance'),
  ('attendance:edit', 'Correct attendance records'),
  ('leave:apply', 'Apply for leave'),
  ('leave:approve', 'Approve or reject leave'),
  ('meetings:read:all', 'See everyone''s doctor visits'),
  ('meetings:read:own', 'See own doctor visits'),
  ('meetings:write', 'Log and edit doctor visits'),
  ('doctors:read', 'See the doctors list'),
  ('doctors:write', 'Add and edit doctors'),
  ('reports:export', 'Export reports (CSV)'),
  ('users:manage', 'Add staff, change roles and access'),
  ('hr:salary', 'See salary and HR details'),
  ('settings:manage', 'Change settings and integrations');
