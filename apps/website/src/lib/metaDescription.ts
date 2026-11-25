import { isNoFasting, isOvernightFast, isSameDay, rupees } from "@/lib/format";

/* Meta descriptions for the generated pages (tests, packages, areas).
   Google cuts descriptions off at about 160 characters, so each builder
   lists its wordings from fullest to shortest and uses the first that fits. */

const MAX = 160;

function fit(...variants: string[][]): string {
  const join = (parts: string[]) => parts.filter(Boolean).join(" ");
  return join(variants.find((parts) => join(parts).length <= MAX) ?? variants[variants.length - 1]);
}

const fastingSentence = (fasting: string) =>
  isNoFasting(fasting) ? "No fasting needed." : isOvernightFast(fasting) ? "Overnight fasting needed." : "";

const reportSentence = (reporting: string) => {
  if (isSameDay(reporting)) return "Report the same day.";
  if (/next\s*day/i.test(reporting)) return "Report the next day.";
  return reporting.trim() ? `Report in ${reporting.trim().toLowerCase()}.` : "";
};

const priceFor = (price: number) => (price > 0 ? ` for ${rupees(price)}` : "");

export function testDescription(t: { name: string; price: number; fasting: string; reporting: string }) {
  const label = /\btest$/i.test(t.name) ? t.name : `${t.name} test`;
  const lead = `${label} in Jamshedpur${priceFor(t.price)}.`;
  const fasting = fastingSentence(t.fasting);
  const report = reportSentence(t.reporting);
  return fit(
    [lead, fasting, report, "Home collection or walk in at Sakchi."],
    [lead, fasting, report, "Home collection available."],
    [lead, fasting, "Home collection available."],
  );
}

export function packageDescription(p: { name: string; price: number; parameters: number; fasting: string; reporting: string }) {
  const covering = p.parameters > 0 ? `, covering ${p.parameters} parameters` : "";
  const lead = `${p.name} health package in Jamshedpur${priceFor(p.price)}${covering}.`;
  const fasting = fastingSentence(p.fasting);
  const report = reportSentence(p.reporting);
  return fit(
    [lead, fasting, report, "Home collection or walk in at Sakchi."],
    [lead, fasting, report, "Home collection available."],
    [lead, fasting, "Home collection available."],
    [lead, "Home collection available."],
  );
}

export function areaDescription(a: { name: string; hasCentre: boolean }) {
  const visit = a.hasCentre ? `our ${a.name} centre` : "our Sakchi lab";
  return fit(
    [`Blood tests, ultrasound, ECG and X-ray for ${a.name}, Jamshedpur.`, `Home sample collection in ${a.name} from 6 AM, or visit ${visit}.`],
    [`Blood tests, ultrasound, ECG and X-ray in ${a.name}, Jamshedpur.`, `Home collection from 6 AM, or visit ${visit}.`],
  );
}
