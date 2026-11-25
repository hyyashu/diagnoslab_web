import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ status }: any) => {
  const map: any = {
    active:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
    suspended:
      "bg-red-100 text-red-600 border border-red-200",
    new:
      "bg-blue-100 text-blue-700 border border-blue-200",
    contacted:
      "bg-amber-100 text-amber-700 border border-amber-200",
    converted:
      "bg-purple-100 text-purple-700 border border-purple-200",
    spam:
      "bg-slate-100 text-slate-600 border border-slate-200",
    lost:
      "bg-rose-100 text-rose-600 border border-rose-200",
    confirmed:
      "bg-green-100 text-green-700 border border-green-200",
    pending:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",
    cancelled:
      "bg-red-100 text-red-700 border border-red-200",
    completed:
      "bg-green-100 text-green-700 border border-green-200",
    refunded:
      "bg-purple-100 text-purple-700 border border-purple-200",
    failed:
      "bg-red-100 text-red-700 border border-red-200",
    present:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
    absent:
      "bg-red-100 text-red-700 border border-red-200",
    late:
      "bg-amber-100 text-amber-700 border border-amber-200",
    onLeave:
      "bg-zinc-100 text-zinc-500 border border-zinc-200",
  };

  const cls =
    map?.[status?.toLowerCase?.()] ||
    "bg-slate-100 text-slate-600 border";

  return (
    <Badge className={`rounded-full px-3 py-1 font-medium ${cls}`}>
      {status || "N/A"}
    </Badge>
  );
};

export default StatusBadge;