import { useMemo, useState, type FormEvent } from "react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { MessageCircle, Phone, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChannelTag } from "./LeadBits";
import type { WebsiteTap } from "./leadTypes";
import { useWebsiteTaps, useDismissTap, useMatchTap } from "./useLeadsApi";

/* Taps on Call / WhatsApp links on the website that nobody has matched to
   a caller yet (last 14 days). Staff match a tap when the call or chat
   comes in: by the Ref code in a WhatsApp message, or by time for calls.
   Matching gives the lead the visit's source and Google click ID. */
export default function WebsiteTaps({ onOpenLead }: { onOpenLead: (id: number) => void }) {
  const [ref, setRef] = useState("");
  const [kind, setKind] = useState<"all" | "call" | "whatsapp">("all");
  const [paid, setPaid] = useState<"all" | "paid" | "organic">("all");
  const [matching, setMatching] = useState<WebsiteTap | null>(null);

  const refQuery = ref.trim().length >= 4 ? ref.trim() : undefined;
  const { data: clicks = [], isLoading, error } = useWebsiteTaps(refQuery);
  const dismiss = useDismissTap();

  const shown = useMemo(
    () =>
      clicks.filter(
        (c) =>
          (kind === "all" || c.channel === kind) &&
          (paid === "all" || (paid === "paid" ? c.isPaid : !c.isPaid)),
      ),
    [clicks, kind, paid],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={ref}
            onChange={(e) => setRef(e.target.value.toUpperCase())}
            placeholder="WhatsApp Ref code, e.g. DL-4K7P"
            className="pl-8 font-mono"
          />
        </div>
        <Select value={kind} onValueChange={(v) => setKind(v as typeof kind)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Calls &amp; WhatsApp</SelectItem>
            <SelectItem value="call">Calls</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
          </SelectContent>
        </Select>
        <Select value={paid} onValueChange={(v) => setPaid(v as typeof paid)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Paid &amp; organic</SelectItem>
            <SelectItem value="paid">Paid (ads)</SelectItem>
            <SelectItem value="organic">Organic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        {refQuery
          ? "Taps with this Ref code."
          : "Website visitors who tapped Call or WhatsApp in the last 14 days. When the call or chat comes in, match it here so the lead keeps its ad source."}
      </p>

      <div className="divide-y rounded-lg border bg-card">
        {isLoading && <div className="p-6 text-sm text-muted-foreground">Loading…</div>}
        {error && <div className="p-6 text-sm text-rose-600">Couldn't load taps. Refresh to try again.</div>}
        {!isLoading && !error && shown.length === 0 && (
          <div className="p-6 text-sm text-muted-foreground">
            {refQuery ? "No tap with this code." : "Nothing to match. New taps show up here."}
          </div>
        )}
        {shown.map((c) => {
          const at = new Date(c.clickedAt);
          return (
            <div key={c.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3 sm:flex-nowrap">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  c.channel === "call" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600",
                )}
              >
                {c.channel === "call" ? <Phone className="size-4" /> : <MessageCircle className="size-4" />}
              </div>
              <div className="w-[110px] shrink-0" title={formatDistanceToNowStrict(at, { addSuffix: true })}>
                <div className="text-sm font-medium tabular-nums">{format(at, "h:mm a")}</div>
                <div className="text-xs text-muted-foreground">{format(at, "d MMM")}</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium">{c.channel === "call" ? "Tapped Call" : "Tapped WhatsApp"}</span>
                  {c.refCode && <span className="rounded bg-muted px-1.5 py-px font-mono text-xs">{c.refCode}</span>}
                  <span className="truncate text-muted-foreground">on {c.page ?? "website"}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <ChannelTag channel={c.from} isPaid={c.isPaid} />
                  {c.campaign && <span>· {c.campaign}</span>}
                  {c.clickId && <span title="Has a Google click ID: a booking can be sent to Google Ads">· click ID</span>}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                {c.leadId ? (
                  <Button variant="outline" size="sm" onClick={() => onOpenLead(c.leadId!)}>
                    {c.leadName || "Open lead"}
                  </Button>
                ) : c.dismissedAt ? (
                  <span className="text-xs text-muted-foreground">Hidden</span>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" disabled={dismiss.isPending} onClick={() => dismiss.mutate(c.id)}>
                      Hide
                    </Button>
                    <Button size="sm" onClick={() => setMatching(c)}>
                      Match
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MatchDialog
        click={matching}
        onClose={() => setMatching(null)}
        onMatched={(leadId) => {
          setMatching(null);
          setRef("");
          onOpenLead(leadId);
        }}
      />
    </div>
  );
}

function MatchDialog({
  click,
  onClose,
  onMatched,
}: {
  click: WebsiteTap | null;
  onClose: () => void;
  onMatched: (leadId: number) => void;
}) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const match = useMatchTap();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!click) return;
    match.mutate(
      { id: click.id, phone, name },
      {
        onSuccess: (r) => {
          toast.success(r.reused ? "Added to their open enquiry" : "Lead created");
          setPhone("");
          setName("");
          onMatched(r.leadId);
        },
      },
    );
  };

  return (
    <Dialog open={!!click} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={submit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Match to caller</DialogTitle>
            <DialogDescription>
              {click &&
                `${click.channel === "call" ? "Call" : "WhatsApp"} tap at ${format(new Date(click.clickedAt), "h:mm a, d MMM")}. Enter the number that ${click.channel === "call" ? "called" : "messaged"}. If they already have an open enquiry, the tap is added to it.`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="match-phone">Mobile number</Label>
            <Input
              id="match-phone"
              inputMode="tel"
              autoFocus
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="98765 43210"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="match-name">Name (optional)</Label>
            <Input id="match-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={match.isPending || phone.replace(/\D/g, "").length < 10}>
              {match.isPending ? "Matching…" : "Match"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
