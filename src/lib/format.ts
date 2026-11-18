/* Prices and the catalogue's fasting / reporting values, worded the same
   way on every card and page. The catalogue stores "Same Day", "Next Day",
   "3 Days", "Not Required" and "Over-Night". */

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* Whole-percent saving; 0 when there is no real discount. */
export const discountPct = (price: number, originalPrice: number) =>
  originalPrice > price && price > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

export const isOvernightFast = (fasting: string) => /over[\s-]*night/i.test(fasting);
export const isNoFasting = (fasting: string) => /not\s*required/i.test(fasting);
export const isSameDay = (reporting: string) => /same\s*day/i.test(reporting);

export const fastingLabel = (fasting: string) =>
  isNoFasting(fasting) ? "No fasting" : isOvernightFast(fasting) ? "Overnight fasting" : fasting;

export const reportLabel = (reporting: string) => {
  if (isSameDay(reporting)) return "Same-day reports";
  if (/next\s*day/i.test(reporting)) return "Next-day reports";
  return `Reports in ${reporting.toLowerCase()}`;
};
