import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endOfToday, format, formatDistanceToNowStrict, isToday, isTomorrow } from "date-fns";
import { Circle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import type { OpenTask } from "./leadTypes";
import { useOpenTasks, useToggleTask } from "./useLeadsApi";

type Group = { key: string; title: string; tone: string; items: OpenTask[] };

/* Open follow-ups, grouped Overdue / Today / Upcoming. Click one to open
   the lead; tick to mark it done. */
export default function FollowUpList({
  upcomingLimit = 5,
  onOpenLead,
}: {
  upcomingLimit?: number;
  onOpenLead?: (leadId: number) => void;
}) {
  const navigate = useNavigate();
  const me = useAuthStore((s) => s.user);
  const [mine, setMine] = useState(false);
  const { data: tasks = [], isLoading } = useOpenTasks();
  const toggle = useToggleTask();

  const groups = useMemo<Group[]>(() => {
    const now = new Date();
    const end = endOfToday();
    const list = mine ? tasks.filter((t) => t.task.assignedTo === me?.id) : tasks;
    const due = (t: OpenTask) => new Date(t.task.dueAt);
    return [
      { key: "overdue", title: "Overdue", tone: "text-rose-600", items: list.filter((t) => due(t) < now) },
      { key: "today", title: "Today", tone: "text-amber-700", items: list.filter((t) => due(t) >= now && due(t) <= end) },
      { key: "later", title: "Upcoming", tone: "text-muted-foreground", items: list.filter((t) => due(t) > end).slice(0, upcomingLimit) },
    ];
  }, [tasks, mine, me?.id, upcomingLimit]);

  const open = (leadId: number) => (onOpenLead ? onOpenLead(leadId) : navigate(`/leads?lead=${leadId}`));
  const total = groups[0].items.length + groups[1].items.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Loading…" : total ? `${total} need attention` : "Nothing due today"}
        </p>
        <div className="inline-flex rounded-md border p-0.5 text-xs">
          {[
            [false, "Everyone"],
            [true, "Mine"],
          ].map(([v, l]) => (
            <button
              key={String(v)}
              onClick={() => setMine(v as boolean)}
              className={cn("rounded px-2 py-0.5", mine === v ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {groups
        .filter((g) => g.items.length)
        .map((g) => (
          <div key={g.key}>
            <h4 className={cn("mb-1 text-xs font-semibold uppercase tracking-wide", g.tone)}>
              {g.title} · {g.items.length}
            </h4>
            <ul className="divide-y rounded-md border">
              {g.items.map(({ task, leadName, leadPhone, assigneeName }) => {
                const due = new Date(task.dueAt);
                const when = isToday(due)
                  ? format(due, "h:mm a")
                  : isTomorrow(due)
                    ? `Tomorrow ${format(due, "h:mm a")}`
                    : format(due, "EEE d MMM, h:mm a");
                return (
                  <li key={task.id} className="flex items-center gap-3 px-3 py-2">
                    <button
                      aria-label="Mark done"
                      title="Mark done"
                      onClick={() => toggle.mutate({ taskId: task.id, done: true })}
                      className="text-muted-foreground hover:text-emerald-600"
                    >
                      <Circle className="size-4" />
                    </button>
                    <button onClick={() => open(task.leadId)} className="min-w-0 flex-1 text-left">
                      <div className="truncate text-sm font-medium">
                        {task.title} · {leadName || "No name"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className={cn(g.key === "overdue" && "font-medium text-rose-600")}>
                          {when}
                          {g.key === "overdue" && ` · ${formatDistanceToNowStrict(due)} late`}
                        </span>
                        {assigneeName && ` · ${assigneeName}`}
                      </div>
                    </button>
                    {leadPhone && (
                      <a
                        href={`tel:${leadPhone.replace(/[^\d+]/g, "")}`}
                        aria-label={`Call ${leadName ?? ""}`}
                        className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                      >
                        <Phone className="size-4" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
    </div>
  );
}
