import type { LeadStatus } from "@diagno/schemas";

export type { LeadStatus };

export type LeadChannel =
  | "google_ads"
  | "meta_ads"
  | "google_search"
  | "other_search"
  | "social"
  | "referral"
  | "direct"
  | "whatsapp"
  | "phone"
  | "walk_in"
  | "other";

export type LostReason = "price" | "distance" | "booked_elsewhere" | "not_needed" | "unreachable" | "other";
export type CallOutcome = "answered" | "no_answer" | "busy" | "switched_off" | "wrong_number";

/* One row of GET /leads. */
export interface LeadRow {
  id: number;
  name: string | null;
  phone: string | null;
  phoneE164: string | null;
  email: string | null;
  message: string | null;
  status: LeadStatus;
  lostReason: LostReason | null;
  assignedTo: number | null;
  assigneeName: string | null;
  contactAttempts: number;
  lastContactedAt: string | null;
  interestKind: "test" | "package" | "scan" | "general" | null;
  interestName: string | null;
  interestPrice: number | null;
  bookedAmount: number | null;
  bookedAt: string | null;
  channel: LeadChannel;
  isPaid: boolean;
  campaign: string | null;
  /* How they first found us (first visit in the last 90 days). */
  firstChannel: LeadChannel | null;
  firstCampaign: string | null;
  source: Record<string, unknown> | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  personId: number | null;
  enquiries: number;
  nextTaskAt: string | null;
}

export interface Activity {
  id: number;
  leadId: number;
  userId: number | null;
  userName: string | null;
  type:
    | "created"
    | "call"
    | "whatsapp"
    | "note"
    | "status_change"
    | "assigned"
    | "task_created"
    | "task_done"
    | "booked"
    | "conversion_sent";
  outcome: CallOutcome | null;
  note: string | null;
  data: Record<string, any> | null;
  createdAt: string;
}

export interface Task {
  id: number;
  leadId: number;
  title: string;
  dueAt: string;
  assignedTo: number | null;
  assigneeName: string | null;
  doneAt: string | null;
  createdAt: string;
}

/* GET /leads/:id */
export interface LeadDetail extends Omit<LeadRow, "enquiries" | "nextTaskAt"> {
  firstContactedAt: string | null;
  bookedItems: { name: string; price: number }[] | null;
  keyword: string | null;
  landingPage: string | null;
  clickId: string | null;
  clickIdType: string | null;
  conversionSentAt: string | null;
  conversionError: string | null;
  person: { id: number; name: string | null; phoneE164: string; email: string | null } | null;
  activities: Activity[];
  tasks: Task[];
  otherLeads: { id: number; status: LeadStatus; interestName: string | null; channel: LeadChannel; createdAt: string }[];
  websiteTaps: { id: number; channel: "call" | "whatsapp"; refCode: string | null; clickedAt: string; page: string | null; clickIdType: string | null }[];
}

/* A tap on a Call / WhatsApp link on the website (GET /leads/taps). */
export interface WebsiteTap {
  id: number;
  channel: "call" | "whatsapp";
  refCode: string | null;
  clickedAt: string;
  page: string | null;
  clickId: string | null;
  clickIdType: string | null;
  source: Record<string, string> | null;
  leadId: number | null;
  leadName: string | null;
  matchedAt: string | null;
  matchedByName: string | null;
  dismissedAt: string | null;
  from: LeadChannel;
  isPaid: boolean;
  campaign: string | null;
  landingPage: string | null;
}

export interface OpenTask {
  task: Task;
  leadName: string | null;
  leadPhone: string | null;
  assigneeName: string | null;
}

export const statusLabel: Record<LeadStatus, string> = {
  new: "New",
  no_answer: "No answer",
  contacted: "Contacted",
  booked: "Booked",
  completed: "Completed",
  lost: "Lost",
  spam: "Spam",
};

export const statusTone: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-blue-700 ring-blue-200",
  no_answer: "bg-amber-50 text-amber-800 ring-amber-200",
  contacted: "bg-violet-50 text-violet-700 ring-violet-200",
  booked: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  completed: "bg-emerald-100 text-emerald-900 ring-emerald-300",
  lost: "bg-rose-50 text-rose-700 ring-rose-200",
  spam: "bg-zinc-100 text-zinc-500 ring-zinc-200",
};

export const channelLabel: Record<LeadChannel, string> = {
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
  google_search: "Google search",
  other_search: "Other search / AI",
  social: "Social",
  referral: "Other website",
  direct: "Website",
  whatsapp: "WhatsApp",
  phone: "Phone call",
  walk_in: "Walk-in",
  other: "Other",
};

export const lostReasonLabel: Record<LostReason, string> = {
  price: "Price",
  distance: "Too far",
  booked_elsewhere: "Booked elsewhere",
  not_needed: "Not needed now",
  unreachable: "Couldn't reach",
  other: "Other",
};

export const outcomeLabel: Record<CallOutcome, string> = {
  answered: "Answered",
  no_answer: "No answer",
  busy: "Busy",
  switched_off: "Switched off",
  wrong_number: "Wrong number",
};

export const inr = (n: number | null | undefined) =>
  n == null ? "" : `₹${n.toLocaleString("en-IN")}`;

/* Digits for wa.me and tel: links. */
export const phoneDigits = (lead: { phoneE164: string | null; phone: string | null }) =>
  (lead.phoneE164 ?? lead.phone ?? "").replace(/\D/g, "");
