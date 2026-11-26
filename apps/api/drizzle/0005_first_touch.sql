-- How the lead first found us (first visit in the last 90 days), next to
-- the latest visit already in channel/campaign. Existing leads only have
-- one visit, so first = latest. Also drops the old-name views left by 0004
-- for the deploy switchover. Safe to re-run.

ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "first_channel" "lead_channel";--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "first_campaign" text;--> statement-breakpoint
UPDATE "leads" SET "first_channel" = "channel", "first_campaign" = "campaign" WHERE "first_channel" IS NULL;--> statement-breakpoint

DROP VIEW IF EXISTS "people";--> statement-breakpoint
DROP VIEW IF EXISTS "lead_activities";--> statement-breakpoint
DROP VIEW IF EXISTS "tasks";
