import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { endOfToday, isAfter, startOfDay, subDays } from "date-fns";
import { Plus, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import PageHeader from "@/components/PageHeader";
import AddLeadSheet from "./AddLeadSheet";
import FollowUpList from "./FollowUpList";
import LeadDetailsSheet from "./LeadDetails";
import LeadsTable from "./LeadsTable";
import { channelLabel, inr, statusLabel, type LeadChannel, type LeadRow, type LeadStatus } from "./leadTypes";
import { useLeadList, useOpenTasks, useOwners } from "./useLeadsApi";

type StatusFilter = "all" | "to_call" | LeadStatus;
type Period = "all" | "today" | "7" | "30";

const statusTabs: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "to_call", label: "To call" },
  ...(["new", "no_answer", "contacted", "booked", "completed", "lost", "spam"] as LeadStatus[]).map((s) => ({
    value: s,
    label: statusLabel[s],
  })),
];

const matchesStatus = (l: LeadRow, f: StatusFilter) =>
  f === "all" ? true : f === "to_call" ? l.status === "new" || l.status === "no_answer" : l.status === f;

const since = (p: Period) =>
  p === "today" ? startOfDay(new Date()) : p === "7" ? subDays(new Date(), 7) : p === "30" ? subDays(new Date(), 30) : null;

export default function LeadManagementScreen() {
  const me = useAuthStore((s) => s.user);
  const [params, setParams] = useSearchParams();
  const openId = params.get("lead") ? Number(params.get("lead")) : null;
  const open = (id: number | null) =>
    setParams((p) => {
      if (id == null) p.delete("lead");
      else p.set("lead", String(id));
      return p;
    });

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [channel, setChannel] = useState<"all" | "ads" | LeadChannel>("all");
  const [owner, setOwner] = useState<string>("all");
  const [period, setPeriod] = useState<Period>("all");
  const [page, setPage] = useState(0);
  const [showTasks, setShowTasks] = useState<boolean | null>(null);

  const { data: leads = [], isLoading, error, refetch, isFetching } = useLeadList();
  const { data: tasks = [] } = useOpenTasks();
  const { data: owners = [] } = useOwners();

  /* Everything except the status filter, so the tab counts stay useful. */
  const scoped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const qDigits = q.replace(/\D/g, "");
    const from = since(period);
    return leads.filter((l) => {
      if (q) {
        const hay = `${l.name ?? ""} ${l.interestName ?? ""} ${l.email ?? ""} ${l.campaign ?? ""}`.toLowerCase();
        const phone = (l.phoneE164 ?? l.phone ?? "").replace(/\D/g, "");
        if (!hay.includes(q) && !(qDigits.length >= 3 && phone.includes(qDigits))) return false;
      }
      if (channel === "ads" && !l.isPaid) return false;
      if (channel !== "all" && channel !== "ads" && l.channel !== channel) return false;
      if (owner === "me" && l.assignedTo !== me?.id) return false;
      if (owner === "none" && l.assignedTo != null) return false;
      if (owner !== "all" && owner !== "me" && owner !== "none" && l.assignedTo !== Number(owner)) return false;
      if (from && !isAfter(new Date(l.createdAt), from)) return false;
      return true;
    });
  }, [leads, query, channel, owner, period, me?.id]);

  const shown = useMemo(() => scoped.filter((l) => matchesStatus(l, status)), [scoped, status]);
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const t of statusTabs) c[t.value] = scoped.filter((l) => matchesStatus(l, t.value)).length;
    return c;
  }, [scoped]);

  useEffect(() => setPage(0), [query, status, channel, owner, period]);

  const stats = useMemo(() => {
    const week = subDays(new Date(), 7);
    const month = subDays(new Date(), 30);
    const recent = leads.filter((l) => isAfter(new Date(l.createdAt), week));
    const booked = leads.filter((l) => l.bookedAt && isAfter(new Date(l.bookedAt), month));
    const dueTasks = tasks.filter((t) => new Date(t.task.dueAt) <= endOfToday());
    const overdue = dueTasks.filter((t) => new Date(t.task.dueAt) < new Date());
    return {
      toCall: leads.filter((l) => l.status === "new" || l.status === "no_answer").length,
      fresh: leads.filter((l) => l.status === "new").length,
      due: dueTasks.length,
      overdue: overdue.length,
      week: recent.length,
      weekAds: recent.filter((l) => l.isPaid).length,
      booked: booked.length,
      revenue: booked.reduce((s, l) => s + (l.bookedAmount ?? 0), 0),
    };
  }, [leads, tasks]);

  /* Open by default whenever something is due today; the user can hide it. */
  const tasksOpen = showTasks ?? stats.due > 0;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Leads"
        description="Website enquiries and walk-ins. Newest first."
        actions={
          <>
            <Button variant="outline" size="icon" onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={cn(isFetching && "animate-spin")} />
            </Button>
            <AddLeadSheet onCreated={open}>
              <Button>
                <Plus /> Add lead
              </Button>
            </AddLeadSheet>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="To call" value={stats.toCall} hint={`${stats.fresh} never called`} onClick={() => setStatus("to_call")} />
        <Stat
          label="Follow-ups due today"
          value={stats.due}
          hint={stats.overdue ? `${stats.overdue} overdue` : "None overdue"}
          alert={stats.overdue > 0}
          onClick={() => setShowTasks(!tasksOpen)}
        />
        <Stat label="Leads, last 7 days" value={stats.week} hint={`${stats.weekAds} from ads`} />
        <Stat label="Booked, last 30 days" value={stats.booked} hint={stats.revenue ? inr(stats.revenue) : "No bookings yet"} />
      </div>

      {tasksOpen && (
        <div className="rounded-lg border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold">Follow-ups</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowTasks(false)}>
              Hide
            </Button>
          </div>
          <FollowUpList onOpenLead={open} />
        </div>
      )}

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, phone or test"
              className="pl-8"
            />
          </div>
          <Select value={channel} onValueChange={(v) => setChannel(v as typeof channel)}>
            <SelectTrigger className="w-[170px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              <SelectItem value="ads">Ads only</SelectItem>
              {(Object.keys(channelLabel) as LeadChannel[]).map((c) => (
                <SelectItem key={c} value={c}>
                  {channelLabel[c]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={owner} onValueChange={setOwner}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Anyone</SelectItem>
              <SelectItem value="me">Mine</SelectItem>
              <SelectItem value="none">Unassigned</SelectItem>
              {owners.map((o) => (
                <SelectItem key={o.id} value={String(o.id)}>
                  {o.name ?? `User ${o.id}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
          {statusTabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setStatus(t.value)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors",
                status === t.value ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              {t.label}
              <span className={cn("tabular-nums text-xs", status === t.value ? "opacity-80" : "text-muted-foreground")}>
                {counts[t.value]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <LeadsTable
        leads={shown}
        loading={isLoading}
        error={error}
        page={page}
        setPage={setPage}
        selectedId={openId}
        onOpen={open}
      />

      <LeadDetailsSheet id={openId} onClose={() => open(null)} onOpenLead={open} />
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  alert,
  onClick,
}: {
  label: string;
  value: number;
  hint: string;
  alert?: boolean;
  onClick?: () => void;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={cn("rounded-lg border bg-card p-4 text-left", onClick && "transition-colors hover:bg-muted/60")}
    >
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
      <div className={cn("text-xs", alert ? "font-medium text-rose-600" : "text-muted-foreground")}>{hint}</div>
    </Tag>
  );
}
