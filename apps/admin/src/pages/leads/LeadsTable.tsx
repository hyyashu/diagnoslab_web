import { format, formatDistanceToNowStrict, isPast } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChannelTag, RepeatTag, StatusPill } from "./LeadBits";
import { inr, type LeadRow } from "./leadTypes";

const PAGE = 50;

interface Props {
  leads: LeadRow[];
  loading: boolean;
  error: unknown;
  page: number;
  setPage: (p: number) => void;
  selectedId: number | null;
  onOpen: (id: number) => void;
}

export default function LeadsTable({ leads, loading, error, page, setPage, selectedId, onOpen }: Props) {
  const pages = Math.max(1, Math.ceil(leads.length / PAGE));
  const rows = leads.slice(page * PAGE, page * PAGE + PAGE);

  if (error) {
    return <p className="rounded-lg border p-6 text-sm text-destructive">Couldn't load leads. Check your connection and refresh.</p>;
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lead</TableHead>
            <TableHead>Interested in</TableHead>
            <TableHead className="hidden md:table-cell">Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Owner</TableHead>
            <TableHead className="hidden lg:table-cell">Follow-up</TableHead>
            <TableHead className="text-right">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={7}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            ))}
          {!loading && rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                No leads match these filters.
              </TableCell>
            </TableRow>
          )}
          {rows.map((l) => {
            const created = new Date(l.createdAt);
            const due = l.nextTaskAt ? new Date(l.nextTaskAt) : null;
            return (
              <TableRow
                key={l.id}
                onClick={() => onOpen(l.id)}
                className={cn("cursor-pointer", selectedId === l.id && "bg-muted")}
              >
                <TableCell>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="max-w-[180px] truncate">{l.name || "No name"}</span>
                    <RepeatTag count={l.enquiries} />
                  </div>
                  <div className="text-xs tabular-nums text-muted-foreground">{l.phone || "No phone"}</div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[220px] truncate text-sm">{l.interestName || <span className="text-muted-foreground">—</span>}</div>
                  {(l.bookedAmount ?? l.interestPrice) != null && (
                    <div className="text-xs text-muted-foreground">
                      {l.bookedAmount != null ? `Booked ${inr(l.bookedAmount)}` : inr(l.interestPrice)}
                    </div>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <ChannelTag channel={l.channel} isPaid={l.isPaid} />
                </TableCell>
                <TableCell>
                  <StatusPill status={l.status} />
                  {l.contactAttempts > 0 && (
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {l.contactAttempts} attempt{l.contactAttempts > 1 ? "s" : ""}
                    </div>
                  )}
                </TableCell>
                <TableCell className="hidden text-sm lg:table-cell">
                  {l.assigneeName || <span className="text-muted-foreground">—</span>}
                </TableCell>
                <TableCell className="hidden text-sm lg:table-cell">
                  {due ? (
                    <span className={cn(isPast(due) && "font-medium text-rose-600")}>{format(due, "d MMM, h:mm a")}</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell
                  className="whitespace-nowrap text-right text-sm tabular-nums"
                  title={formatDistanceToNowStrict(created, { addSuffix: true })}
                >
                  <div>{format(created, "d MMM yyyy")}</div>
                  <div className="text-xs text-muted-foreground">{format(created, "h:mm a")}</div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {pages > 1 && (
        <div className="flex items-center justify-between border-t px-4 py-2 text-sm text-muted-foreground">
          <span>
            {page * PAGE + 1}–{Math.min(leads.length, page * PAGE + PAGE)} of {leads.length}
          </span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" disabled={page === 0} onClick={() => setPage(page - 1)} aria-label="Previous page">
              <ChevronLeft />
            </Button>
            <Button variant="ghost" size="icon" disabled={page >= pages - 1} onClick={() => setPage(page + 1)} aria-label="Next page">
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
