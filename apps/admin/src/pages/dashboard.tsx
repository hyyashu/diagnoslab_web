import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNowStrict, isAfter, startOfDay, startOfMonth } from "date-fns";
import { Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthStore, useCan } from "@/store/authStore";
import FollowUpList from "./leads/FollowUpList";
import { ChannelTag } from "./leads/LeadBits";
import { inr } from "./leads/leadTypes";
import { useLeadList, useOpenTasks } from "./leads/useLeadsApi";

export const Dashboard = () => {
  const can = useCan();
  if (!can("leads:read:all", "leads:read:own")) return <Welcome />;
  return <LeadsDashboard />;
};

/* For staff without lead access (lab staff): a simple home page. */
function Welcome() {
  const user = useAuthStore((s) => s.user);
  return (
    <div className="space-y-5">
      <PageHeader title={`Hello${user?.name ? `, ${user.name.split(" ")[0]}` : ""}`} description={`Signed in as ${user?.roleLabel ?? "staff"}.`} />
      <p className="text-sm text-muted-foreground">Use the menu for the pages you have access to.</p>
    </div>
  );
}

function LeadsDashboard() {
  const can = useCan();
  const navigate = useNavigate();
  const name = useAuthStore((s) => s.user?.name);
  const { data: leads = [] } = useLeadList();
  const { data: tasks = [] } = useOpenTasks();

  const s = useMemo(() => {
    const today = startOfDay(new Date());
    const month = startOfMonth(new Date());
    const booked = leads.filter((l) => l.bookedAt && isAfter(new Date(l.bookedAt), month));
    return {
      today: leads.filter((l) => isAfter(new Date(l.createdAt), today)).length,
      neverCalled: leads.filter((l) => l.status === "new" && l.contactAttempts === 0),
      overdue: tasks.filter((t) => new Date(t.task.dueAt) < new Date()).length,
      booked: booked.length,
      revenue: booked.reduce((a, l) => a + (l.bookedAmount ?? 0), 0),
    };
  }, [leads, tasks]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-5">
      <PageHeader title={`${greeting}${name ? `, ${name.split(" ")[0]}` : ""}`} description="Here's who needs a call." />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Follow-ups overdue" value={s.overdue} alert={s.overdue > 0} onClick={() => navigate("/leads")} />
        <Stat label="Waiting for first call" value={s.neverCalled.length} onClick={() => navigate("/leads")} />
        <Stat label="New leads today" value={s.today} />
        <Stat label="Booked this month" value={s.booked} hint={can("leads:revenue") && s.revenue ? inr(s.revenue) : undefined} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <FollowUpList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Waiting for first call</CardTitle>
          </CardHeader>
          <CardContent>
            {s.neverCalled.length === 0 ? (
              <p className="text-sm text-muted-foreground">Everyone has been called.</p>
            ) : (
              <ul className="divide-y rounded-md border">
                {s.neverCalled.slice(0, 8).map((l) => (
                  <li key={l.id} className="flex items-center gap-3 px-3 py-2">
                    <button onClick={() => navigate(`/leads?lead=${l.id}`)} className="min-w-0 flex-1 text-left">
                      <div className="truncate text-sm font-medium">
                        {l.name || "No name"}
                        {l.interestName && <span className="font-normal text-muted-foreground"> · {l.interestName}</span>}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {formatDistanceToNowStrict(new Date(l.createdAt), { addSuffix: true })} ·
                        <ChannelTag channel={l.channel} isPaid={l.isPaid} />
                      </div>
                    </button>
                    {l.phone && (
                      <a
                        href={`tel:${(l.phoneE164 ?? l.phone).replace(/[^\d+]/g, "")}`}
                        aria-label={`Call ${l.name ?? ""}`}
                        className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                      >
                        <Phone className="size-4" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {s.neverCalled.length > 8 && (
              <button onClick={() => navigate("/leads")} className="mt-2 text-sm font-medium underline-offset-4 hover:underline">
                See all {s.neverCalled.length}
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, hint, alert, onClick }: { label: string; value: number; hint?: string; alert?: boolean; onClick?: () => void }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag onClick={onClick} className={cn("rounded-lg border bg-card p-4 text-left", onClick && "hover:bg-muted/60")}>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className={cn("mt-1 text-2xl font-semibold tabular-nums", alert && "text-rose-600")}>{value}</div>
      {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
    </Tag>
  );
}
