import { cn } from "@/lib/utils";
import { channelLabel, statusLabel, statusTone, type LeadChannel, type LeadStatus } from "./leadTypes";

export function StatusPill({ status, className }: { status: LeadStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        statusTone[status],
        className,
      )}
    >
      {statusLabel[status]}
    </span>
  );
}

export function ChannelTag({ channel, isPaid }: { channel: LeadChannel; isPaid: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm">
      {channelLabel[channel]}
      {isPaid && (
        <span className="rounded bg-orange-100 px-1 py-px text-[10px] font-semibold uppercase tracking-wide text-orange-800">
          Ad
        </span>
      )}
    </span>
  );
}

export function RepeatTag({ count }: { count: number }) {
  if (count < 2) return null;
  return (
    <span
      title={`${count} enquiries from this number`}
      className="rounded bg-sky-100 px-1.5 py-px text-[11px] font-semibold text-sky-800"
    >
      {count}×
    </span>
  );
}
