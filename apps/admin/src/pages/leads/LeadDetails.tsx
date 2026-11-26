import { useEffect, useState } from "react";
import { addDays, addHours, format, formatDistanceToNowStrict, isPast, setHours, setMinutes, startOfTomorrow } from "date-fns";
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  MessageCircle,
  Phone,
  PhoneCall,
  Plus,
  StickyNote,
  Trash2,
  UserRound,
  ArrowRightLeft,
  Sparkles,
  ListChecks,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { leadStatusValues } from "@diagno/schemas";
import { useCan } from "@/store/authStore";
import { ChannelTag, StatusPill } from "./LeadBits";
import {
  channelLabel,
  inr,
  lostReasonLabel,
  outcomeLabel,
  phoneDigits,
  statusLabel,
  statusTone,
  type Activity,
  type CallOutcome,
  type LeadDetail,
  type LeadStatus,
  type LostReason,
} from "./leadTypes";
import {
  useBookLead,
  useCreateTask,
  useLead,
  useLogActivity,
  useOwners,
  useToggleTask,
  useUpdateLead,
} from "./useLeadsApi";

interface Props {
  id: number | null;
  onClose: () => void;
  onOpenLead: (id: number) => void;
}

export default function LeadDetailsSheet({ id, onClose, onOpenLead }: Props) {
  const { data: lead, isLoading, error } = useLead(id);

  return (
    <Sheet open={id != null} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-[560px]">
        {isLoading || !lead ? (
          <div className="space-y-4 p-6">
            <SheetHeader className="sr-only">
              <SheetTitle>Lead</SheetTitle>
              <SheetDescription>Loading lead</SheetDescription>
            </SheetHeader>
            {error ? (
              <p className="text-sm text-destructive">Couldn't load this lead.</p>
            ) : (
              <>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-40 w-full" />
              </>
            )}
          </div>
        ) : (
          <LeadBody key={lead.id} lead={lead} onOpenLead={onOpenLead} />
        )}
      </SheetContent>
    </Sheet>
  );
}

function LeadBody({ lead, onOpenLead }: { lead: LeadDetail; onOpenLead: (id: number) => void }) {
  const can = useCan();
  const canWork = can("leads:work");
  const digits = phoneDigits(lead);
  const first = lead.name?.trim().split(/\s+/)[0];
  const waText = `Hi${first ? ` ${first}` : ""}, this is Diagnos Lab, Jamshedpur. Thank you for your enquiry${
    lead.interestName ? ` about ${lead.interestName}` : ""
  }. How can we help you book?`;
  const [booking, setBooking] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="space-y-3 border-b p-5 pr-12">
        <SheetHeader className="space-y-1 text-left">
          <SheetTitle className="text-xl">{lead.name || "No name"}</SheetTitle>
          <SheetDescription className="tabular-nums">
            {lead.phone || "No phone"}
            {lead.email ? ` · ${lead.email}` : ""}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <StatusPill status={lead.status} />
          <ChannelTag channel={lead.channel} isPaid={lead.isPaid} />
          <span className="text-muted-foreground">· {format(new Date(lead.createdAt), "d MMM yyyy, h:mm a")}</span>
        </div>
        {digits && (
          <div className="flex flex-wrap gap-2 pt-1">
            <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700">
              <a href={`tel:+${digits}`}>
                <Phone /> Call
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href={`https://wa.me/${digits}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
            {canWork && (
              <Button size="sm" variant="outline" onClick={() => setBooking((b) => !b)}>
                <CalendarCheck /> Book
              </Button>
            )}
          </div>
        )}
      </div>

      {booking && <BookForm lead={lead} onDone={() => setBooking(false)} />}

      {canWork && (
        <>
          <Section title="Status and owner">
            <PipelineControls lead={lead} onBook={() => setBooking(true)} />
          </Section>

          <Section title="Log contact">
            <LogContact leadId={lead.id} />
          </Section>

          <Section title="Follow-ups">
            <FollowUps lead={lead} />
          </Section>
        </>
      )}

      <Section title="Enquiry">
        <EnquiryFacts lead={lead} />
      </Section>

      {lead.otherLeads.length > 0 && (
        <Section title={`Other enquiries from this number (${lead.otherLeads.length})`}>
          <ul className="divide-y rounded-md border">
            {lead.otherLeads.map((o) => (
              <li key={o.id}>
                <button
                  onClick={() => onOpenLead(o.id)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  <span className="min-w-0">
                    <span className="block truncate">{o.interestName || channelLabel[o.channel]}</span>
                    <span className="text-xs text-muted-foreground">{format(new Date(o.createdAt), "d MMM yyyy")}</span>
                  </span>
                  <StatusPill status={o.status} />
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Timeline">
        <Timeline activities={lead.activities} legacyNote={lead.notes} />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 border-b p-5 last:border-b-0">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}

/* ---------- Status, lost reason, owner ---------- */

/* Status is a row of pills: one click to change. "Booked" opens the booking
   form (what they booked and the total); "Lost" asks why first. */
function PipelineControls({ lead, onBook }: { lead: LeadDetail; onBook: () => void }) {
  const canAssign = useCan()("leads:assign");
  const update = useUpdateLead(lead.id);
  const { data: owners = [] } = useOwners();
  const [pendingLost, setPendingLost] = useState(false);

  const current = pendingLost ? "lost" : lead.status;
  const setStatus = (s: LeadStatus) => {
    if (s === current) return;
    if (s === "lost") return setPendingLost(true); // ask why first
    setPendingLost(false);
    if (s === "booked") return onBook();
    update.mutate({ status: s });
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Status" className="sm:col-span-2">
        <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Status">
          {leadStatusValues.filter((s) => s !== "completed" || current === "completed").map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={current === s}
              disabled={update.isPending}
              onClick={() => setStatus(s)}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset transition-colors disabled:opacity-60",
                current === s
                  ? cn(statusTone[s], "ring-2")
                  : "bg-background text-muted-foreground ring-border hover:bg-muted hover:text-foreground",
              )}
            >
              {statusLabel[s]}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Owner">
        <Select
          value={lead.assignedTo ? String(lead.assignedTo) : "none"}
          onValueChange={(v) => update.mutate({ assignedTo: v === "none" ? null : Number(v) })}
          disabled={!canAssign}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Unassigned</SelectItem>
            {owners.map((o) => (
              <SelectItem key={o.id} value={String(o.id)}>
                {o.name ?? `User ${o.id}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      {(pendingLost || lead.status === "lost") && (
        <Field label="Why lost?" className="sm:col-span-2">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(lostReasonLabel) as LostReason[]).map((r) => (
              <Chip
                key={r}
                active={lead.status === "lost" && lead.lostReason === r}
                onClick={() => {
                  update.mutate({ status: "lost", lostReason: r }, { onSuccess: () => setPendingLost(false) });
                }}
              >
                {lostReasonLabel[r]}
              </Chip>
            ))}
            {pendingLost && lead.status !== "lost" && (
              <Button size="sm" variant="ghost" onClick={() => setPendingLost(false)}>
                Cancel
              </Button>
            )}
          </div>
        </Field>
      )}
    </div>
  );
}

/* ---------- Call / WhatsApp / note ---------- */

function LogContact({ leadId }: { leadId: number }) {
  const log = useLogActivity(leadId);
  const [type, setType] = useState<"call" | "whatsapp" | "note">("call");
  const [outcome, setOutcome] = useState<CallOutcome | null>(null);
  const [note, setNote] = useState("");

  const canSave = type === "call" ? !!outcome : type === "note" ? !!note.trim() : true;
  const save = () =>
    log.mutate(
      { type, outcome: type === "call" ? outcome ?? undefined : undefined, note: note.trim() || undefined },
      {
        onSuccess: () => {
          setOutcome(null);
          setNote("");
        },
      },
    );

  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-md border p-0.5">
        {(
          [
            ["call", "Call", PhoneCall],
            ["whatsapp", "WhatsApp", MessageCircle],
            ["note", "Note", StickyNote],
          ] as const
        ).map(([v, label, Icon]) => (
          <button
            key={v}
            onClick={() => setType(v)}
            className={cn(
              "flex items-center gap-1.5 rounded px-3 py-1 text-sm",
              type === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" /> {label}
          </button>
        ))}
      </div>

      {type === "call" && (
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(outcomeLabel) as CallOutcome[]).map((o) => (
            <Chip key={o} active={outcome === o} onClick={() => setOutcome(o)}>
              {outcomeLabel[o]}
            </Chip>
          ))}
        </div>
      )}

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={type === "note" ? 3 : 2}
        placeholder={
          type === "call" ? "What did they say? (optional)" : type === "whatsapp" ? "What did you send? (optional)" : "Write a note"
        }
        className="w-full resize-y rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button size="sm" disabled={!canSave || log.isPending} onClick={save}>
        {type === "call" ? "Save call" : type === "whatsapp" ? "Save WhatsApp" : "Save note"}
      </Button>
    </div>
  );
}

/* ---------- Booking ---------- */

function BookForm({ lead, onDone }: { lead: LeadDetail; onDone: () => void }) {
  const book = useBookLead(lead.id);
  const [items, setItems] = useState<{ name: string; price: string }[]>(() =>
    lead.bookedItems?.length
      ? lead.bookedItems.map((i) => ({ name: i.name, price: String(i.price) }))
      : [{ name: lead.interestName ?? "", price: lead.interestPrice ? String(lead.interestPrice) : "" }],
  );
  const total = items.reduce((s, i) => s + (Number(i.price) || 0), 0);
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState("");
  const valid = items.some((i) => i.name.trim()) && (amount ? Number(amount) : total) > 0;

  const set = (idx: number, key: "name" | "price", v: string) =>
    setItems((xs) => xs.map((x, i) => (i === idx ? { ...x, [key]: key === "price" ? v.replace(/\D/g, "") : v } : x)));

  const submit = () => {
    const clean = items.filter((i) => i.name.trim()).map((i) => ({ name: i.name.trim(), price: Number(i.price) || 0 }));
    book.mutate(
      { items: clean, amount: amount ? Number(amount) : total, note: note.trim() || undefined },
      { onSuccess: onDone },
    );
  };

  return (
    <div className="space-y-3 border-b bg-emerald-50/60 p-5 dark:bg-emerald-950/20">
      <h3 className="flex items-center gap-1.5 text-sm font-semibold">
        <CalendarCheck className="size-4" /> What did they book?
      </h3>
      {items.map((it, idx) => (
        <div key={idx} className="flex gap-2">
          <Input placeholder="Test, package or scan" value={it.name} onChange={(e) => set(idx, "name", e.target.value)} />
          <div className="relative w-28 shrink-0">
            <IndianRupee className="pointer-events-none absolute left-2 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              inputMode="numeric"
              placeholder="Price"
              className="pl-6"
              value={it.price}
              onChange={(e) => set(idx, "price", e.target.value)}
            />
          </div>
          {items.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Remove item"
              onClick={() => setItems((xs) => xs.filter((_, i) => i !== idx))}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={() => setItems((xs) => [...xs, { name: "", price: "" }])}>
        <Plus /> Add item
      </Button>
      <div className="flex flex-wrap items-end gap-3">
        <Field label="Total paid (₹)">
          <Input
            inputMode="numeric"
            className="w-32"
            placeholder={String(total)}
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
          />
        </Field>
        <Field label="Note" className="min-w-[180px] flex-1">
          <Input placeholder="Optional, e.g. discount given" value={note} onChange={(e) => setNote(e.target.value)} />
        </Field>
      </div>
      <div className="flex gap-2">
        <Button size="sm" disabled={!valid || book.isPending} onClick={submit}>
          Mark booked · {inr(amount ? Number(amount) : total)}
        </Button>
        <Button size="sm" variant="ghost" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

/* ---------- Follow-up tasks ---------- */

const at10 = (d: Date) => setMinutes(setHours(d, 10), 0);
const presets: { label: string; at: () => Date }[] = [
  { label: "In 2 hours", at: () => addHours(new Date(), 2) },
  { label: "Tomorrow 10 AM", at: () => at10(startOfTomorrow()) },
  { label: "In 3 days", at: () => at10(addDays(new Date(), 3)) },
  { label: "Next week", at: () => at10(addDays(new Date(), 7)) },
];
const toLocalInput = (d: Date) => format(d, "yyyy-MM-dd'T'HH:mm");

function FollowUps({ lead }: { lead: LeadDetail }) {
  const create = useCreateTask(lead.id);
  const toggle = useToggleTask();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("Call back");
  const [due, setDue] = useState(() => toLocalInput(at10(startOfTomorrow())));

  useEffect(() => {
    if (!adding) {
      setTitle("Call back");
      setDue(toLocalInput(at10(startOfTomorrow())));
    }
  }, [adding]);

  const open = lead.tasks.filter((t) => !t.doneAt);
  const done = lead.tasks.filter((t) => t.doneAt);

  return (
    <div className="space-y-2">
      {lead.tasks.length === 0 && !adding && <p className="text-sm text-muted-foreground">No follow-ups.</p>}
      <ul className="space-y-1">
        {[...open, ...done].map((t) => {
          const dueAt = new Date(t.dueAt);
          const late = !t.doneAt && isPast(dueAt);
          return (
            <li key={t.id} className="flex items-start gap-2 text-sm">
              <button
                aria-label={t.doneAt ? "Mark not done" : "Mark done"}
                onClick={() => toggle.mutate({ taskId: t.id, done: !t.doneAt })}
                className="mt-0.5 text-muted-foreground hover:text-foreground"
              >
                {t.doneAt ? <CheckCircle2 className="size-4 text-emerald-600" /> : <Circle className="size-4" />}
              </button>
              <div className={cn("min-w-0 flex-1", t.doneAt && "text-muted-foreground line-through")}>
                {t.title}
                <div className={cn("text-xs", late ? "font-medium text-rose-600" : "text-muted-foreground")}>
                  {format(dueAt, "EEE d MMM, h:mm a")}
                  {late && " · overdue"}
                  {t.assigneeName && ` · ${t.assigneeName}`}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {adding ? (
        <div className="space-y-2 rounded-md border p-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What to do" />
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => (
              <Chip key={p.label} active={false} onClick={() => setDue(toLocalInput(p.at()))}>
                {p.label}
              </Chip>
            ))}
          </div>
          <Input type="datetime-local" value={due} onChange={(e) => setDue(e.target.value)} className="w-fit" />
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={!title.trim() || !due || create.isPending}
              onClick={() =>
                create.mutate(
                  { title: title.trim(), dueAt: new Date(due).toISOString() },
                  { onSuccess: () => setAdding(false) },
                )
              }
            >
              Add follow-up
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setAdding(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setAdding(true)}>
          <Plus /> Add follow-up
        </Button>
      )}
    </div>
  );
}

/* ---------- What they asked about and where they came from ---------- */

const clickIdName: Record<string, string> = {
  gclid: "Google click ID",
  gbraid: "Google click ID (iPhone app)",
  wbraid: "Google click ID (iPhone web)",
  fbclid: "Facebook click ID",
};

/* "/lp/x/?gclid=..." -> path and its query, so the page shows the path
   and keeps the full link on hover. */
function splitUrl(url: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url, "https://diagnoslab.in");
    return { path: u.pathname, params: u.searchParams };
  } catch {
    return { path: url, params: new URLSearchParams() };
  }
}

/* "https://www.google.com/" -> "google.com". */
function siteName(url: string | null) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* Whether the booking went to Google Ads (via the conversions sheet). */
function adsStatus(lead: LeadDetail): string | null {
  const booked = lead.status === "booked" || lead.status === "completed";
  if (lead.conversionSentAt && !lead.conversionError)
    return `Booking sent, ${format(new Date(lead.conversionSentAt), "d MMM h:mm a")}`;
  if (lead.conversionError) return `${lead.conversionSentAt ? "Not sent" : "Will retry"}: ${lead.conversionError}`;
  if (!booked) return null;
  const fromGoogle = lead.channel === "google_ads" || ["gclid", "gbraid", "wbraid"].includes(lead.clickIdType ?? "");
  return fromGoogle ? "Booking will be sent in a few minutes" : "Not sent (not from Google Ads)";
}

function EnquiryFacts({ lead }: { lead: LeadDetail }) {
  const src = (lead.source ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" && v ? v : null);
  const landing = splitUrl(lead.landingPage);
  /* Google Ads adds its own campaign ID to the link; shown when there is no UTM name. */
  const adsCampaignId = landing?.params.get("gad_campaignid") ?? landing?.params.get("utm_id");
  const campaign = lead.campaign ?? (adsCampaignId ? `ID ${adsCampaignId}` : null);
  const rows: [string, React.ReactNode][] = [
    ["Interested in", lead.interestName ? `${lead.interestName}${lead.interestPrice ? ` · ${inr(lead.interestPrice)}` : ""}` : null],
    ["Message", lead.message],
    ["Booked", lead.bookedItems?.length ? `${lead.bookedItems.map((i) => i.name).join(", ")} · ${inr(lead.bookedAmount)}` : null],
    ["Source", channelLabel[lead.channel] + (lead.isPaid ? " (paid)" : "")],
    ["Campaign", campaign],
    [
      "First found us",
      lead.firstChannel && (lead.firstChannel !== lead.channel || (lead.firstCampaign ?? null) !== (lead.campaign ?? null))
        ? [channelLabel[lead.firstChannel], lead.firstCampaign, str(src.first_visit_at)].filter(Boolean).join(" · ")
        : null,
    ],
    ["Keyword", lead.keyword],
    [
      "Landing page",
      landing ? (
        <span title={lead.landingPage ?? undefined}>
          {landing.path}
          {landing.params.size > 0 && <span className="text-muted-foreground"> + ad tags</span>}
        </span>
      ) : null,
    ],
    ["Came from", siteName(str(src.referrer))],
    [
      "Ad click ID",
      lead.clickIdType
        ? `${clickIdName[lead.clickIdType] ?? lead.clickIdType} saved${
            src.ads_click_from === "earlier_visit"
              ? ` (from an earlier ad visit, ${str(src.ads_click_at) ?? ""})`
              : src.ads_click_from === "google_cookie"
                ? " (from Google's cookie)"
                : ""
          }`
        : null,
    ],
    ["Google Ads", adsStatus(lead)],
    [
      "Tapped",
      lead.websiteTaps?.length
        ? lead.websiteTaps
            .map(
              (c) =>
                `${c.channel === "call" ? "Call" : "WhatsApp"}${c.refCode ? ` (${c.refCode})` : ""} on ${c.page ?? "website"}, ${format(new Date(c.clickedAt), "d MMM h:mm a")}`,
            )
            .join(" · ")
        : null,
    ],
    ["Contact attempts", lead.contactAttempts ? `${lead.contactAttempts}, last ${formatDistanceToNowStrict(new Date(lead.lastContactedAt!), { addSuffix: true })}` : null],
  ];
  return (
    <dl className="grid grid-cols-[120px_1fr] gap-x-3 gap-y-1.5 text-sm">
      {rows
        .filter(([, v]) => v)
        .map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="min-w-0 break-words">{v}</dd>
          </div>
        ))}
    </dl>
  );
}

/* ---------- Timeline ---------- */

function describe(a: Activity): { icon: React.ElementType; text: string } {
  const d = a.data ?? {};
  switch (a.type) {
    case "created":
      return { icon: Sparkles, text: a.userName ? `Added by ${a.userName}` : `Enquiry received (${channelLabel[d.channel as keyof typeof channelLabel] ?? "website"})` };
    case "call":
      return { icon: PhoneCall, text: `Called · ${a.outcome ? outcomeLabel[a.outcome] : ""}` };
    case "whatsapp":
      return { icon: MessageCircle, text: "WhatsApp sent" };
    case "note":
      return { icon: StickyNote, text: "Note" };
    case "status_change":
      return {
        icon: ArrowRightLeft,
        text: `${statusLabel[d.from as LeadStatus] ?? d.from} → ${statusLabel[d.to as LeadStatus] ?? d.to}${
          d.lostReason ? ` (${lostReasonLabel[d.lostReason as LostReason]})` : ""
        }${d.auto ? " · automatic" : ""}`,
      };
    case "assigned":
      return { icon: UserRound, text: d.to ? "Owner changed" : "Owner removed" };
    case "task_created":
      return { icon: ListChecks, text: `Follow-up set for ${d.dueAt ? format(new Date(d.dueAt), "d MMM, h:mm a") : ""}` };
    case "task_done":
      return { icon: CheckCircle2, text: "Follow-up done" };
    case "booked":
      return { icon: CalendarCheck, text: `Booked · ${inr(d.amount)}` };
    case "conversion_sent":
      return { icon: IndianRupee, text: "Sent to Google Ads" };
  }
}

function Timeline({ activities, legacyNote }: { activities: Activity[]; legacyNote: string | null }) {
  return (
    <ol className="relative space-y-4 border-l pl-5">
      {activities.map((a) => {
        const { icon: Icon, text } = describe(a);
        const items = a.type === "booked" && Array.isArray(a.data?.items) ? (a.data!.items as { name: string; price: number }[]) : null;
        return (
          <li key={a.id} className="relative">
            <span className="absolute -left-[29px] top-0 flex size-[18px] items-center justify-center rounded-full border bg-background">
              <Icon className="size-3 text-muted-foreground" />
            </span>
            <div className="text-sm font-medium">{text}</div>
            {items && <div className="text-sm">{items.map((i) => `${i.name} ${inr(i.price)}`).join(", ")}</div>}
            {a.note && <p className="whitespace-pre-wrap text-sm text-foreground/80">{a.note}</p>}
            <div className="text-xs text-muted-foreground">
              {format(new Date(a.createdAt), "d MMM, h:mm a")}
              {a.userName && a.type !== "created" ? ` · ${a.userName}` : ""}
            </div>
          </li>
        );
      })}
      {legacyNote && (
        <li className="relative">
          <span className="absolute -left-[29px] top-0 flex size-[18px] items-center justify-center rounded-full border bg-background">
            <StickyNote className="size-3 text-muted-foreground" />
          </span>
          <div className="text-sm font-medium">Old note</div>
          <p className="whitespace-pre-wrap text-sm text-foreground/80">{legacyNote}</p>
        </li>
      )}
    </ol>
  );
}

/* ---------- Small pieces ---------- */

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block space-y-1", className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 text-xs transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}
