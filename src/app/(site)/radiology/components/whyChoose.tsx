import Icon from "@/components/ui/icon";
import { shell } from "@/components/ui/shell";
import { whyPoints } from "../content";

/* DL.pen radiology "Why Choose": five points in one divided card on
   desktop, a list on phones. */
export default function WhyChoose() {
  return (
    <section aria-labelledby="why-heading" className="bg-dl-bg py-10 md:py-24">
      <div className={`${shell} flex flex-col gap-5 md:gap-10`}>
        <div className="flex flex-col gap-1.5 md:flex-row md:items-end md:justify-between md:gap-16">
          <h2
            id="why-heading"
            className="font-display text-[21px] font-extrabold leading-[1.15] tracking-[-0.03em] text-dl-ink md:max-w-[620px] md:text-[38px] md:leading-[1.1]"
          >
            <span className="md:hidden">Why patients choose us for imaging</span>
            <span className="hidden md:inline">Why patients in Jamshedpur choose us for imaging</span>
          </h2>
          <p className="text-[13px] leading-normal text-dl-ink-2 md:max-w-[460px] md:text-[15px] md:leading-relaxed">
            <span className="md:hidden">Trusted by thousands of patients across Jamshedpur.</span>
            <span className="hidden md:inline">
              Trusted by thousands of patients for accurate radiology services — with reports your doctor can act on the same day.
            </span>
          </p>
        </div>

        <ol className="flex flex-col gap-px overflow-hidden rounded-[20px] border border-dl-line bg-dl-line md:grid md:grid-cols-5 md:rounded-3xl">
          {whyPoints.map((p, i) => (
            <li key={p.title} className="flex items-start gap-3.5 bg-white p-4 md:flex-col md:gap-5 md:p-6">
              <div className="flex items-center justify-between md:w-full">
                <span
                  className={`flex size-10 items-center justify-center rounded-xl md:size-11 ${
                    p.highlight ? "bg-dl-red text-white" : "bg-dl-red-soft text-dl-red"
                  }`}
                >
                  <Icon name={p.icon} className="size-5" />
                </span>
                <span className="hidden font-display text-sm font-extrabold text-dl-muted/60 md:block" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <h3 className="font-display text-[14.5px] font-bold text-dl-ink md:text-base">{p.title}</h3>
                <p className="text-[12.5px] leading-normal text-dl-ink-2 md:text-[13.5px]">
                  <span className="md:hidden">{p.mobileText}</span>
                  <span className="hidden md:inline">{p.text}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
