import {
  Activity,
  Baby,
  Bean,
  Bone,
  Droplet,
  FlaskConical,
  HandHeart,
  HeartPulse,
  PersonStanding,
  Pill,
  ScanLine,
  ShieldPlus,
  Thermometer,
  Venus,
  Wind,
  type LucideIcon,
} from "lucide-react";

/* Icons that content files name by string (the DL.pen lucide names). Only
   these are bundled; add to the map when content needs a new one. */
const icons: Record<string, LucideIcon> = {
  activity: Activity,
  baby: Baby,
  bean: Bean,
  bone: Bone,
  droplet: Droplet,
  "flask-conical": FlaskConical,
  "hand-heart": HandHeart,
  "heart-pulse": HeartPulse,
  "person-standing": PersonStanding,
  pill: Pill,
  "scan-line": ScanLine,
  "shield-plus": ShieldPlus,
  thermometer: Thermometer,
  venus: Venus,
  wind: Wind,
};

export default function Icon({ name, className }: { name: string; className?: string }) {
  const Glyph = icons[name] ?? Activity;
  return <Glyph className={className} aria-hidden />;
}
