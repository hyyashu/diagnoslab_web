-- Clearer names for the lead tables, and website Call / WhatsApp taps.
--   people          -> contacts
--   lead_activities -> lead_events
--   tasks           -> lead_followups
-- Renames keep every row, index and foreign key. Views with the old names
-- keep the previous API container working for the few seconds both run
-- during a deploy; a later migration drops them. Safe to re-run.

DO $$ BEGIN
  IF to_regclass('public.people') IS NOT NULL AND to_regclass('public.contacts') IS NULL THEN
    ALTER TABLE "people" RENAME TO "contacts";
    ALTER SEQUENCE IF EXISTS "people_id_seq" RENAME TO "contacts_id_seq";
  END IF;
  IF to_regclass('public.lead_activities') IS NOT NULL AND to_regclass('public.lead_events') IS NULL THEN
    ALTER TABLE "lead_activities" RENAME TO "lead_events";
    ALTER SEQUENCE IF EXISTS "lead_activities_id_seq" RENAME TO "lead_events_id_seq";
  END IF;
  IF to_regclass('public.tasks') IS NOT NULL AND to_regclass('public.lead_followups') IS NULL THEN
    ALTER TABLE "tasks" RENAME TO "lead_followups";
    ALTER SEQUENCE IF EXISTS "tasks_id_seq" RENAME TO "lead_followups_id_seq";
  END IF;
END $$;--> statement-breakpoint

CREATE OR REPLACE VIEW "people" AS SELECT * FROM "contacts";--> statement-breakpoint
CREATE OR REPLACE VIEW "lead_activities" AS SELECT * FROM "lead_events";--> statement-breakpoint
CREATE OR REPLACE VIEW "tasks" AS SELECT * FROM "lead_followups";--> statement-breakpoint

DO $$ BEGIN
  CREATE TYPE "website_tap_channel" AS ENUM ('call', 'whatsapp');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "website_taps" (
  "id" serial PRIMARY KEY NOT NULL,
  "channel" "website_tap_channel" NOT NULL,
  "ref_code" text UNIQUE,
  "clicked_at" timestamp with time zone DEFAULT now() NOT NULL,
  "page" text,
  "click_id" text,
  "click_id_type" text,
  "source" jsonb,
  "lead_id" integer REFERENCES "leads"("id") ON DELETE SET NULL,
  "matched_at" timestamp with time zone,
  "matched_by" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "dismissed_at" timestamp with time zone
);--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "website_taps_clicked_idx" ON "website_taps" ("clicked_at" DESC);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "website_taps_lead_idx" ON "website_taps" ("lead_id");
