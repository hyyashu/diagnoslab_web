/* "Ravi  Kumar" -> "RK". Splits on any run of spaces, so double spaces in
   names can't crash a screen. */
export function initials(name: string | null | undefined): string {
  if (!name || !name.trim()) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}
