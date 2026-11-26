import { z } from "zod";

// Input — used by API validation + website form
export const CreateLeadSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.email().optional(),
  message: z.string().optional(),
  source: z.any().optional(),
});

// Response — used by admin/mobile React Query hooks
export const LeadResponseSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  message: z.string().nullable(),
  source: z.any().nullable(),
  status: z.string().nullable(),
  notes: z.string().nullable(),
  welcomeSentAt: z.string().nullable(),
  createdAt: z.string(),
});

export type CreateLeadInput = z.infer<typeof CreateLeadSchema>;
export type LeadResponse = z.infer<typeof LeadResponseSchema>;

// Lead pipeline, in the order the team works through it.
// `contacted` = spoke to them, not booked yet.
export const leadStatusValues = ['new', 'no_answer', 'contacted', 'booked', 'completed', 'lost', 'spam'] as const;
export const LeadStatusEnum = z.enum(leadStatusValues);
export type LeadStatus = (typeof leadStatusValues)[number];

export const lostReasonValues = ['price', 'distance', 'booked_elsewhere', 'not_needed', 'unreachable', 'other'] as const;
export const LostReasonEnum = z.enum(lostReasonValues);

export const leadChannelValues = [
  'google_ads', 'meta_ads', 'google_search', 'other_search', 'social',
  'referral', 'direct', 'whatsapp', 'phone', 'walk_in', 'other',
] as const;
export type LeadChannel = (typeof leadChannelValues)[number];

export const callOutcomeValues = ['answered', 'no_answer', 'busy', 'switched_off', 'wrong_number'] as const;
export const CallOutcomeEnum = z.enum(callOutcomeValues);

/* Staff changes to a lead from the dashboard. */
export const UpdateLeadSchema = z.object({
  status: LeadStatusEnum.optional(),
  lostReason: LostReasonEnum.nullable().optional(),
  assignedTo: z.number().int().positive().nullable().optional(),
  name: z.string().trim().min(1).optional(),
});
export type UpdateLeadInput = z.infer<typeof UpdateLeadSchema>;

/* A call, WhatsApp message or note on the timeline. A call needs its outcome. */
export const LogActivitySchema = z
  .object({
    type: z.enum(['call', 'whatsapp', 'note']),
    outcome: CallOutcomeEnum.optional(),
    note: z.string().trim().max(2000).optional(),
  })
  .refine((v) => v.type !== 'call' || !!v.outcome, { message: 'Choose how the call went', path: ['outcome'] })
  .refine((v) => v.type !== 'note' || !!v.note, { message: 'Write the note', path: ['note'] });
export type LogActivityInput = z.infer<typeof LogActivitySchema>;

/* What they booked, in whole rupees. */
export const BookLeadSchema = z.object({
  items: z.array(z.object({ name: z.string().trim().min(1), price: z.number().int().min(0) })).min(1),
  amount: z.number().int().min(0),
  note: z.string().trim().max(2000).optional(),
});
export type BookLeadInput = z.infer<typeof BookLeadSchema>;

export const CreateTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  dueAt: z.iso.datetime({ offset: true }),
  assignedTo: z.number().int().positive().nullable().optional(),
});
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = z.object({ done: z.boolean() });
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;

export const AdminCreateLeadSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.email().optional(),
  message: z.string().optional(),
  source: z.any().optional(),
  status: LeadStatusEnum.optional(),
  notes: z.string().optional(),
  welcomeSentAt: z.iso.datetime().transform((val) => new Date(val)).optional(),
});

export const AdminUpdateLeadSchema = AdminCreateLeadSchema.partial();

export type AdminCreateLeadInput = z.infer<typeof AdminCreateLeadSchema>;
export type AdminUpdateLeadInput = z.infer<typeof AdminUpdateLeadSchema>;

/* A browser's push subscription, as PushSubscription.toJSON() gives it. */
export const PushSubscribeSchema = z.object({
  endpoint: z.url(),
  keys: z.object({ p256dh: z.string().min(1), auth: z.string().min(1) }),
});
export type PushSubscribeInput = z.infer<typeof PushSubscribeSchema>;
export const PushUnsubscribeSchema = z.object({ endpoint: z.url() });

/* POST /leads/taps (public): a tap on a Call or WhatsApp link. */
export const WebsiteTapSchema = z.object({
  channel: z.enum(['call', 'whatsapp']),
  refCode: z
    .string()
    .regex(/^DL-[A-Z0-9]{4}$/)
    .optional(),
  page: z.string().max(500).optional(),
  source: z.record(z.string(), z.string().max(1000)).optional(),
});
export type WebsiteTapInput = z.infer<typeof WebsiteTapSchema>;

/* Staff link a tap to the person who called or messaged. */
export const MatchTapSchema = z.object({
  phone: z.string().trim().min(10).max(20),
  name: z.string().trim().max(100).optional(),
});
export type MatchTapInput = z.infer<typeof MatchTapSchema>;
