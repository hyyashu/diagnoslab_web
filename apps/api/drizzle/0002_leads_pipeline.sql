-- Leads pipeline: people, attribution and booking columns, timeline, follow-up tasks.
-- Hand-written (the drizzle snapshot is behind the live database, see
-- 0000/0001 vs the 4 applied migrations), so it only touches leads tables.
-- It adds and never drops; existing values are kept.

-- Status: `converted` becomes `booked`; add `no_answer` and `completed`.
ALTER TYPE "lead_status" RENAME VALUE 'converted' TO 'booked';--> statement-breakpoint
ALTER TYPE "lead_status" ADD VALUE IF NOT EXISTS 'no_answer';--> statement-breakpoint
ALTER TYPE "lead_status" ADD VALUE IF NOT EXISTS 'completed';--> statement-breakpoint

CREATE TYPE "lead_lost_reason" AS ENUM('price', 'distance', 'booked_elsewhere', 'not_needed', 'unreachable', 'other');--> statement-breakpoint
CREATE TYPE "lead_channel" AS ENUM('google_ads', 'meta_ads', 'google_search', 'other_search', 'social', 'referral', 'direct', 'whatsapp', 'phone', 'walk_in', 'other');--> statement-breakpoint
CREATE TYPE "lead_interest_kind" AS ENUM('test', 'package', 'scan', 'general');--> statement-breakpoint
CREATE TYPE "lead_activity_type" AS ENUM('created', 'call', 'whatsapp', 'note', 'status_change', 'assigned', 'task_created', 'task_done', 'booked', 'conversion_sent');--> statement-breakpoint
CREATE TYPE "call_outcome" AS ENUM('answered', 'no_answer', 'busy', 'switched_off', 'wrong_number');--> statement-breakpoint

CREATE TABLE "people" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text,
  "phone_e164" text NOT NULL,
  "email" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "people_phone_e164_unique" UNIQUE("phone_e164")
);--> statement-breakpoint

-- Old rows were saved in UTC without a zone; keep the same instant.
ALTER TABLE "leads" ALTER COLUMN "created_at" TYPE timestamp with time zone USING "created_at" AT TIME ZONE 'UTC';--> statement-breakpoint
UPDATE "leads" SET "status" = 'new' WHERE "status" IS NULL;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint

ALTER TABLE "leads" ADD COLUMN "person_id" integer REFERENCES "people"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "phone_e164" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "lost_reason" "lead_lost_reason";--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "assigned_to" integer REFERENCES "users"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "first_contacted_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "last_contacted_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "contact_attempts" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "interest_kind" "lead_interest_kind";--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "interest_name" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "interest_price" integer;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "booked_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "booked_items" jsonb;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "booked_amount" integer;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "channel" "lead_channel" DEFAULT 'other' NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "is_paid" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "campaign" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "keyword" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "landing_page" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "click_id" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "click_id_type" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "conversion_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "conversion_error" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint

CREATE TABLE "lead_activities" (
  "id" serial PRIMARY KEY NOT NULL,
  "lead_id" integer NOT NULL REFERENCES "leads"("id") ON DELETE CASCADE,
  "user_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "type" "lead_activity_type" NOT NULL,
  "outcome" "call_outcome",
  "note" text,
  "data" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint

CREATE TABLE "tasks" (
  "id" serial PRIMARY KEY NOT NULL,
  "lead_id" integer NOT NULL REFERENCES "leads"("id") ON DELETE CASCADE,
  "title" text NOT NULL,
  "due_at" timestamp with time zone NOT NULL,
  "assigned_to" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "created_by" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "done_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint

CREATE INDEX "leads_status_created_idx" ON "leads" ("status", "created_at" DESC);--> statement-breakpoint
CREATE INDEX "leads_phone_e164_idx" ON "leads" ("phone_e164");--> statement-breakpoint
CREATE INDEX "leads_person_idx" ON "leads" ("person_id");--> statement-breakpoint
CREATE INDEX "leads_channel_created_idx" ON "leads" ("channel", "created_at" DESC);--> statement-breakpoint
CREATE INDEX "leads_assigned_idx" ON "leads" ("assigned_to");--> statement-breakpoint
CREATE INDEX "lead_activities_lead_created_idx" ON "lead_activities" ("lead_id", "created_at");--> statement-breakpoint
CREATE INDEX "tasks_open_due_idx" ON "tasks" ("done_at", "due_at");--> statement-breakpoint
CREATE INDEX "tasks_lead_idx" ON "tasks" ("lead_id");
