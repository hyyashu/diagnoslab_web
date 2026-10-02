/* Class names for the design's pill button (DL.pen "Button" component).
   A helper rather than a component because the same pill is rendered as a
   <button>, a <Link> or an <a> depending on what it does. */

type Variant = "primary" | "dark" | "outline" | "neutral" | "neutralDark" | "white" | "whiteInk" | "whatsapp";
type Size = "md" | "sm" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dl-red";

const variants: Record<Variant, string> = {
  primary: "bg-dl-red text-white hover:bg-dl-red-dark",
  dark: "bg-dl-ink text-white hover:bg-black",
  outline:
    "border-[1.5px] border-dl-red text-dl-red bg-white hover:bg-dl-red-soft",
  neutral: "border border-dl-line bg-white text-dl-ink hover:border-dl-ink",
  neutralDark: "border border-white/25 text-white hover:border-white",
  white: "bg-white text-dl-red font-bold hover:bg-dl-red-soft",
  /* On the red footer. */
  whiteInk: "bg-white text-dl-ink hover:bg-white/90",
  whatsapp: "bg-dl-whatsapp text-white hover:brightness-95",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-[22px] py-[13px] text-sm",
  lg: "px-[26px] py-[14px] text-[15px]",
};

export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  extra = "",
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}
