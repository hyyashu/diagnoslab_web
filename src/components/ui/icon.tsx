import {
  Activity,
  Baby,
  Bean,
  Bone,
  Clock3,
  Droplet,
  FileCheck,
  FlaskConical,
  HandHeart,
  HeartPulse,
  Monitor,
  PersonStanding,
  Pill,
  ScanLine,
  ShieldPlus,
  Thermometer,
  UserRoundCheck,
  Users,
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
  "clock-3": Clock3,
  droplet: Droplet,
  "file-check": FileCheck,
  "flask-conical": FlaskConical,
  "hand-heart": HandHeart,
  "heart-pulse": HeartPulse,
  monitor: Monitor,
  "person-standing": PersonStanding,
  pill: Pill,
  "scan-line": ScanLine,
  "shield-plus": ShieldPlus,
  thermometer: Thermometer,
  "user-round-check": UserRoundCheck,
  users: Users,
  venus: Venus,
  wind: Wind,
};

export default function Icon({ name, className }: { name: string; className?: string }) {
  const Glyph = icons[name] ?? Activity;
  return <Glyph className={className} aria-hidden />;
}
