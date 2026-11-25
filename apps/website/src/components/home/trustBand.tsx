import { ShieldCheck, Stethoscope } from "lucide-react";

const stats = [
  { value: "15+", label: "Years serving Jamshedpur" },
  { value: "2 Lakh+", label: "Tests processed every year" },
  { value: "60 min", label: "Home collection window" },
  { value: "12 hrs", label: "Average report turnaround" },
];

/* DL.pen "Trust Band". The design only has it on phones. */
export default function TrustBand() {
  return (
    <section aria-labelledby="trust-heading" className="flex flex-col gap-6 bg-dl-red px-4 py-10 text-white md:hidden">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-bold tracking-[0.15em] text-white/70">WHY DIAGNOS LAB</p>
        <h2 id="trust-heading" className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.03em]">
          Reports you can trust, from a lab you can visit.
        </h2>
        <ul className="flex flex-wrap gap-2 pt-1">
          {[
            { icon: ShieldCheck, text: "ISO certified" },
            { icon: Stethoscope, text: "Pathologist verified" },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-1.5 rounded-full bg-white/[0.12] px-[11px] py-1.5 text-xs font-semibold">
              <Icon className="size-3.5" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-white/20 bg-white/20">
        {stats.map((s) => (
          <div key={s.value} className="flex flex-col gap-1 bg-[#DE4540] p-[18px]">
            <dt className="order-2 text-xs leading-[1.4] text-white/80">{s.label}</dt>
            <dd className="order-1 font-display text-[28px] font-extrabold tracking-[-0.03em]">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
