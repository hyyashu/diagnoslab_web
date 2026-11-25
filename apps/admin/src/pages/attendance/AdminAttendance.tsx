import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/common/StatusBadge";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Status = "present" | "absent" | "late" | "on-leave";

interface Employee {
  id: number;
  name: string;
  role: string;
  avatar: string;
  dept: string;
  status: Status;
  checkIn: string;
  checkOut: string;
  hours: string;
}

interface DayRecord {
  emp: string;
  avatar: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: Status;
}

interface DayData {
  present: number;
  absent: number;
  late: number;
  onLeave: number;
  records: DayRecord[];
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const employees: Employee[] = [
  { id: 1,  name: "Dr. Priya Sharma",  role: "Pathologist",         avatar: "PS", dept: "Pathology",    status: "present",  checkIn: "08:10 AM", checkOut: "06:05 PM", hours: "9h 55m"  },
  { id: 2,  name: "Dr. Arjun Mehta",   role: "Radiologist",          avatar: "AM", dept: "Radiology",    status: "present",  checkIn: "07:55 AM", checkOut: "06:12 PM", hours: "10h 17m" },
  { id: 3,  name: "Neha Kapoor",       role: "Lab Technician",       avatar: "NK", dept: "Biochemistry", status: "absent",   checkIn: "—",        checkOut: "—",        hours: "—"       },
  { id: 4,  name: "Dr. Suresh Iyer",   role: "Microbiologist",       avatar: "SI", dept: "Microbiology", status: "late",     checkIn: "10:15 AM", checkOut: "07:00 PM", hours: "8h 45m"  },
  { id: 5,  name: "Anita Desai",       role: "Phlebotomist",         avatar: "AD", dept: "Collection",   status: "present",  checkIn: "07:45 AM", checkOut: "05:50 PM", hours: "10h 5m"  },
  { id: 6,  name: "Rajan Pillai",      role: "Lab Assistant",        avatar: "RP", dept: "Hematology",   status: "present",  checkIn: "08:05 AM", checkOut: "06:00 PM", hours: "9h 55m"  },
  { id: 7,  name: "Dr. Kavitha Nair",  role: "Clinical Chemist",     avatar: "KN", dept: "Biochemistry", status: "on-leave", checkIn: "—",        checkOut: "—",        hours: "—"       },
  { id: 8,  name: "Sameer Joshi",      role: "Sample Processor",     avatar: "SJ", dept: "Collection",   status: "present",  checkIn: "08:00 AM", checkOut: "05:58 PM", hours: "9h 58m"  },
  { id: 9,  name: "Dr. Meena Tiwari",  role: "Haematologist",        avatar: "MT", dept: "Hematology",   status: "late",     checkIn: "10:42 AM", checkOut: "07:10 PM", hours: "8h 28m"  },
  { id: 10, name: "Deepak Rao",        role: "Equipment Technician", avatar: "DR", dept: "Radiology",    status: "absent",   checkIn: "—",        checkOut: "—",        hours: "—"       },
];

const calendarData: Record<string, DayData> = {
  "2026-03-01": { present: 8, absent: 1, late: 1, onLeave: 0, records: [
    { emp: "Dr. Priya Sharma",  avatar: "PS", checkIn: "08:05 AM", checkOut: "06:00 PM", hours: "9h 55m",  status: "present"  },
    { emp: "Dr. Arjun Mehta",   avatar: "AM", checkIn: "07:58 AM", checkOut: "06:10 PM", hours: "10h 12m", status: "present"  },
    { emp: "Neha Kapoor",       avatar: "NK", checkIn: "08:30 AM", checkOut: "05:50 PM", hours: "9h 20m",  status: "present"  },
    { emp: "Dr. Suresh Iyer",   avatar: "SI", checkIn: "—",        checkOut: "—",        hours: "—",       status: "absent"   },
    { emp: "Anita Desai",       avatar: "AD", checkIn: "07:45 AM", checkOut: "05:45 PM", hours: "10h 0m",  status: "present"  },
    { emp: "Rajan Pillai",      avatar: "RP", checkIn: "08:10 AM", checkOut: "06:05 PM", hours: "9h 55m",  status: "present"  },
    { emp: "Dr. Kavitha Nair",  avatar: "KN", checkIn: "08:00 AM", checkOut: "06:00 PM", hours: "10h 0m",  status: "present"  },
    { emp: "Sameer Joshi",      avatar: "SJ", checkIn: "10:30 AM", checkOut: "06:30 PM", hours: "8h 0m",   status: "late"     },
    { emp: "Dr. Meena Tiwari",  avatar: "MT", checkIn: "08:15 AM", checkOut: "06:10 PM", hours: "9h 55m",  status: "present"  },
    { emp: "Deepak Rao",        avatar: "DR", checkIn: "08:20 AM", checkOut: "05:55 PM", hours: "9h 35m",  status: "present"  },
  ]},
  "2026-03-02": { present: 7, absent: 1, late: 1, onLeave: 1, records: [
    { emp: "Dr. Priya Sharma",  avatar: "PS", checkIn: "08:08 AM", checkOut: "06:02 PM", hours: "9h 54m",  status: "present"  },
    { emp: "Dr. Arjun Mehta",   avatar: "AM", checkIn: "07:55 AM", checkOut: "06:00 PM", hours: "10h 5m",  status: "present"  },
    { emp: "Neha Kapoor",       avatar: "NK", checkIn: "—",        checkOut: "—",        hours: "—",       status: "absent"   },
    { emp: "Dr. Suresh Iyer",   avatar: "SI", checkIn: "10:20 AM", checkOut: "07:05 PM", hours: "8h 45m",  status: "late"     },
    { emp: "Anita Desai",       avatar: "AD", checkIn: "07:50 AM", checkOut: "05:50 PM", hours: "10h 0m",  status: "present"  },
    { emp: "Rajan Pillai",      avatar: "RP", checkIn: "08:05 AM", checkOut: "06:00 PM", hours: "9h 55m",  status: "present"  },
    { emp: "Dr. Kavitha Nair",  avatar: "KN", checkIn: "—",        checkOut: "—",        hours: "—",       status: "on-leave" },
    { emp: "Sameer Joshi",      avatar: "SJ", checkIn: "08:00 AM", checkOut: "05:58 PM", hours: "9h 58m",  status: "present"  },
    { emp: "Dr. Meena Tiwari",  avatar: "MT", checkIn: "08:12 AM", checkOut: "06:08 PM", hours: "9h 56m",  status: "present"  },
    { emp: "Deepak Rao",        avatar: "DR", checkIn: "08:18 AM", checkOut: "05:52 PM", hours: "9h 34m",  status: "present"  },
  ]},
  "2026-03-03": { present: 6, absent: 2, late: 1, onLeave: 1, records: [
    { emp: "Dr. Priya Sharma",  avatar: "PS", checkIn: "08:11 AM", checkOut: "06:05 PM", hours: "9h 54m",  status: "present"  },
    { emp: "Dr. Arjun Mehta",   avatar: "AM", checkIn: "07:52 AM", checkOut: "06:08 PM", hours: "10h 16m", status: "present"  },
    { emp: "Neha Kapoor",       avatar: "NK", checkIn: "—",        checkOut: "—",        hours: "—",       status: "absent"   },
    { emp: "Dr. Suresh Iyer",   avatar: "SI", checkIn: "08:05 AM", checkOut: "06:00 PM", hours: "9h 55m",  status: "present"  },
    { emp: "Anita Desai",       avatar: "AD", checkIn: "—",        checkOut: "—",        hours: "—",       status: "absent"   },
    { emp: "Rajan Pillai",      avatar: "RP", checkIn: "08:08 AM", checkOut: "06:02 PM", hours: "9h 54m",  status: "present"  },
    { emp: "Dr. Kavitha Nair",  avatar: "KN", checkIn: "—",        checkOut: "—",        hours: "—",       status: "on-leave" },
    { emp: "Sameer Joshi",      avatar: "SJ", checkIn: "10:50 AM", checkOut: "07:00 PM", hours: "8h 10m",  status: "late"     },
    { emp: "Dr. Meena Tiwari",  avatar: "MT", checkIn: "08:09 AM", checkOut: "06:03 PM", hours: "9h 54m",  status: "present"  },
    { emp: "Deepak Rao",        avatar: "DR", checkIn: "08:15 AM", checkOut: "05:58 PM", hours: "9h 43m",  status: "present"  },
  ]},
  "2026-03-04": { present: 8, absent: 0, late: 1, onLeave: 1, records: [
    { emp: "Dr. Priya Sharma",  avatar: "PS", checkIn: "08:06 AM", checkOut: "06:00 PM", hours: "9h 54m",  status: "present"  },
    { emp: "Dr. Arjun Mehta",   avatar: "AM", checkIn: "07:57 AM", checkOut: "06:07 PM", hours: "10h 10m", status: "present"  },
    { emp: "Neha Kapoor",       avatar: "NK", checkIn: "08:20 AM", checkOut: "05:55 PM", hours: "9h 35m",  status: "present"  },
    { emp: "Dr. Suresh Iyer",   avatar: "SI", checkIn: "08:02 AM", checkOut: "05:58 PM", hours: "9h 56m",  status: "present"  },
    { emp: "Anita Desai",       avatar: "AD", checkIn: "07:48 AM", checkOut: "05:48 PM", hours: "10h 0m",  status: "present"  },
    { emp: "Rajan Pillai",      avatar: "RP", checkIn: "10:15 AM", checkOut: "07:10 PM", hours: "8h 55m",  status: "late"     },
    { emp: "Dr. Kavitha Nair",  avatar: "KN", checkIn: "—",        checkOut: "—",        hours: "—",       status: "on-leave" },
    { emp: "Sameer Joshi",      avatar: "SJ", checkIn: "07:58 AM", checkOut: "05:54 PM", hours: "9h 56m",  status: "present"  },
    { emp: "Dr. Meena Tiwari",  avatar: "MT", checkIn: "08:10 AM", checkOut: "06:04 PM", hours: "9h 54m",  status: "present"  },
    { emp: "Deepak Rao",        avatar: "DR", checkIn: "08:14 AM", checkOut: "05:59 PM", hours: "9h 45m",  status: "present"  },
  ]},
  "2026-03-05": { present: 7, absent: 1, late: 1, onLeave: 1, records: [
    { emp: "Dr. Priya Sharma",  avatar: "PS", checkIn: "08:09 AM", checkOut: "05:58 PM", hours: "9h 49m",  status: "present"  },
    { emp: "Dr. Arjun Mehta",   avatar: "AM", checkIn: "07:52 AM", checkOut: "06:05 PM", hours: "10h 13m", status: "present"  },
    { emp: "Neha Kapoor",       avatar: "NK", checkIn: "—",        checkOut: "—",        hours: "—",       status: "absent"   },
    { emp: "Dr. Suresh Iyer",   avatar: "SI", checkIn: "10:18 AM", checkOut: "07:10 PM", hours: "8h 52m",  status: "late"     },
    { emp: "Anita Desai",       avatar: "AD", checkIn: "07:48 AM", checkOut: "05:45 PM", hours: "9h 57m",  status: "present"  },
    { emp: "Rajan Pillai",      avatar: "RP", checkIn: "08:01 AM", checkOut: "05:59 PM", hours: "9h 58m",  status: "present"  },
    { emp: "Dr. Kavitha Nair",  avatar: "KN", checkIn: "—",        checkOut: "—",        hours: "—",       status: "on-leave" },
    { emp: "Sameer Joshi",      avatar: "SJ", checkIn: "07:58 AM", checkOut: "05:55 PM", hours: "9h 57m",  status: "present"  },
    { emp: "Dr. Meena Tiwari",  avatar: "MT", checkIn: "08:14 AM", checkOut: "06:06 PM", hours: "9h 52m",  status: "present"  },
    { emp: "Deepak Rao",        avatar: "DR", checkIn: "08:19 AM", checkOut: "05:57 PM", hours: "9h 38m",  status: "present"  },
  ]},
};

// ─── UTILS ────────────────────────────────────────────────────────────────────

const toKey = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const highlightedDates: Date[] = Object.keys(calendarData).map(
  (k) => new Date(k + "T12:00:00")
);

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

const Av = ({ initials }: { initials: string }) => (
  <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-semibold shrink-0">
    {initials}
  </div>
);

interface StatCardProps {
  label: string;
  value: number | string;
  sub: string;
  valueClass?: string;
}

const StatCard = ({ label, value, sub, valueClass = "text-zinc-900" }: StatCardProps) => (
  <Card className="flex-1 min-w-0 rounded-xl border border-zinc-200 shadow-none">
    <CardContent className="p-4 sm:p-5">
      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">{label}</p>
      <p className={`text-3xl sm:text-4xl font-black leading-none mb-1 ${valueClass}`}>{value}</p>
      <p className="text-xs sm:text-sm text-zinc-400">{sub}</p>
    </CardContent>
  </Card>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function AttendanceDashboard() {
  const [search, setSearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filtered = employees.filter((e) => {
    const q = search.toLowerCase();
    const matchQ =
      e.name.toLowerCase().includes(q) ||
      e.dept.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q);
    const matchF = filterStatus === "all" || e.status === filterStatus;
    return matchQ && matchF;
  });

  const counts = {
    present: employees.filter((e) => e.status === "present").length,
    absent:  employees.filter((e) => e.status === "absent").length,
    late:    employees.filter((e) => e.status === "late").length,
    onLeave: employees.filter((e) => e.status === "on-leave").length,
  };

  const selectedKey = selectedDate ? toKey(selectedDate) : null;
  const dayData: DayData | null = selectedKey ? (calendarData[selectedKey] ?? null) : null;

  const fmtSelected = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      })
    : null;

  const markerStats = Object.values(calendarData);

  return (
    <div>
      <div className="space-y-5">
        <PageHeader title="Attendance" description={`Monitoring ${employees.length} active staff members`} />

        {/* ── TABS ── */}
        <Tabs defaultValue="today">

          {/* Tab triggers */}
          <TabsList className="bg-zinc-100 rounded-lg p-1 h-auto w-fit mb-6 flex gap-1">
            <TabsTrigger
              value="today"
              className="rounded-md px-4 sm:px-5 py-1.5 text-sm font-semibold text-zinc-500
                         data-[state=active]:bg-white data-[state=active]:text-zinc-900
                         data-[state=active]:shadow-sm transition-all"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-md px-4 sm:px-5 py-1.5 text-sm font-semibold text-zinc-500
                         data-[state=active]:bg-white data-[state=active]:text-zinc-900
                         data-[state=active]:shadow-sm transition-all"
            >
              History
            </TabsTrigger>
          </TabsList>

          {/* ════════════════ TODAY ════════════════ */}
          <TabsContent value="today" className="mt-0 flex flex-col gap-6">

            {/* Stat cards — flex row wrapping on mobile */}
            <div className="flex flex-row flex-wrap gap-3 sm:gap-4">
              <StatCard label="Present"  value={counts.present} sub={`of ${employees.length} staff`} valueClass="text-zinc-900"   />
              <StatCard label="Absent"   value={counts.absent}  sub="not checked in"                 valueClass="text-red-600"    />
              <StatCard label="Late"     value={counts.late}    sub="after 09:00 AM"                 valueClass="text-amber-600"  />
              <StatCard label="On Leave" value={counts.onLeave} sub="approved leave"                 valueClass="text-violet-600" />
            </div>

            {/* Filter bar */}
            <Card className="rounded-xl border border-zinc-200 shadow-none">
              <CardContent className="p-3 sm:p-4 flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[160px]">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="pl-9 h-10 text-sm border-zinc-200 rounded-lg"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-36 h-10 text-sm border-zinc-200 rounded-lg shrink-0">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Scrollable table wrapper on mobile */}
            <Card className="rounded-xl border border-zinc-200 shadow-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50">
                      {["S.No.", "Name", "Role", "Department", "Check In", "Check Out", "Hours", "Status"].map((h) => (
                        <th key={h} className="px-4 sm:px-5 py-4 text-left text-sm font-medium text-zinc-500 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((emp, i) => (
                      <tr
                        key={emp.id}
                        className={`hover:bg-zinc-50 transition-colors ${i < filtered.length - 1 ? "border-b border-zinc-100" : ""}`}
                      >
                        <td className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-400 whitespace-nowrap">{emp.id}</td>
                        <td className="px-4 sm:px-5 py-4 sm:py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Av initials={emp.avatar} />
                            <span className="text-sm sm:text-base font-medium text-zinc-900">{emp.name}</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-600 whitespace-nowrap">{emp.role}</td>
                        <td className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-600 whitespace-nowrap">{emp.dept}</td>
                        <td className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-900 font-mono whitespace-nowrap">{emp.checkIn}</td>
                        <td className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-900 font-mono whitespace-nowrap">{emp.checkOut}</td>
                        <td className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-400 font-mono whitespace-nowrap">{emp.hours}</td>
                        <td className="px-4 sm:px-5 py-4 sm:py-5 whitespace-nowrap"><StatusBadge status={emp.status} /></td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-5 py-16 text-center text-sm sm:text-base text-zinc-400">
                          No staff match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            <p className="text-sm text-zinc-400">{filtered.length} of {employees.length} staff shown</p>
          </TabsContent>

          {/* ════════════════ HISTORY ════════════════ */}
          <TabsContent value="history" className="mt-0">

            {/* On mobile: stack vertically. On lg: side by side */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">

              {/* ── Calendar + overview column ── */}
              <div className="w-full lg:w-72 lg:shrink-0 flex flex-col sm:flex-row lg:flex-col gap-4">

                {/* Calendar card */}
                <Card className="rounded-xl border border-zinc-200 shadow-none flex-1 lg:flex-none">
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
                      Select Date
                    </p>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      defaultMonth={new Date(2026, 2)}
                      modifiers={{ hasData: highlightedDates }}
                      modifiersClassNames={{
                        hasData: "font-bold underline decoration-zinc-900 underline-offset-2",
                      }}
                      className="p-0 w-full"
                      classNames={{
                        months: "w-full",
                        month: "w-full space-y-1",
                        caption: "flex justify-center items-center relative h-8 mb-2",
                        caption_label: "text-sm font-semibold text-zinc-900",
                        nav: "flex items-center",
                        nav_button:
                          "h-7 w-7 border border-zinc-200 rounded-lg flex items-center justify-center hover:bg-zinc-100 transition-colors bg-transparent",
                        nav_button_previous: "absolute left-0",
                        nav_button_next: "absolute right-0",
                        table: "w-full border-collapse",
                        head_row: "flex w-full",
                        head_cell: "flex-1 text-center text-[11px] font-semibold text-zinc-400 uppercase py-1",
                        row: "flex w-full mt-0.5",
                        cell: "flex-1 text-center p-0",
                        day: "h-8 w-full text-sm text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors",
                        day_selected: "bg-zinc-900 !text-white hover:bg-zinc-800 font-semibold rounded-lg",
                        day_today: "border border-zinc-400 font-semibold text-zinc-900 rounded-lg",
                        day_outside: "text-zinc-300",
                        day_disabled: "text-zinc-300 opacity-40",
                      }}
                    />
                    <Separator className="my-3" />
                    <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <span className="font-bold text-zinc-700 underline decoration-zinc-900 underline-offset-2">6</span>
                      = has attendance records
                    </p>
                  </CardContent>
                </Card>

                {/* March overview */}
                <Card className="rounded-xl border border-zinc-200 shadow-none flex-1 lg:flex-none">
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
                      March Overview
                    </p>
                    <div className="flex flex-col gap-0">
                      {([
                        ["Days Logged",    Object.keys(calendarData).length,                                                                     "text-zinc-900"  ],
                        ["Avg Present",    (markerStats.reduce((a, d) => a + d.present, 0) / markerStats.length).toFixed(1),                     "text-zinc-900"  ],
                        ["Avg Absent",     (markerStats.reduce((a, d) => a + d.absent,  0) / markerStats.length).toFixed(1),                     "text-red-500"   ],
                        ["Late Instances", markerStats.reduce((a, d) => a + d.late, 0),                                                          "text-amber-500" ],
                      ] as [string, string | number, string][]).map(([label, val, cls]) => (
                        <div key={label} className="flex justify-between items-center py-3 border-b border-zinc-100 last:border-none">
                          <span className="text-sm text-zinc-500">{label}</span>
                          <span className={`text-xl sm:text-2xl font-black ${cls}`}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ── Detail panel ── */}
              <div className="flex-1 min-w-0 w-full flex flex-col gap-5">

                {!selectedDate ? (
                  <Card className="rounded-xl border border-zinc-200 shadow-none">
                    <CardContent className="py-20 sm:py-24 flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2"/>
                          <path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-base font-semibold text-zinc-700">Select a date</p>
                        <p className="text-sm text-zinc-400 mt-0.5">
                          Click any underlined date on the calendar to view staff records.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : !dayData ? (
                  <Card className="rounded-xl border border-zinc-200 shadow-none">
                    <CardContent className="py-20 sm:py-24 text-center">
                      <p className="text-base font-semibold text-zinc-700">{fmtSelected}</p>
                      <p className="text-sm text-zinc-400 mt-1">No records found for this date.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Day header */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-zinc-900">{fmtSelected}</h2>
                        <p className="text-sm text-zinc-400 mt-0.5">
                          Attendance record · {dayData.records.length} staff members
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDate(undefined)}
                        className="text-sm border-zinc-200 text-zinc-500 hover:bg-zinc-50 rounded-lg h-9 shrink-0"
                      >
                        Clear
                      </Button>
                    </div>

                    {/* Stat cards row */}
                    <div className="flex flex-row flex-wrap gap-3">
                      <StatCard label="Present"  value={dayData.present}  sub="on time"        valueClass="text-zinc-900"   />
                      <StatCard label="Absent"   value={dayData.absent}   sub="not checked in" valueClass="text-red-600"    />
                      <StatCard label="Late"     value={dayData.late}     sub="after 09:00 AM" valueClass="text-amber-600"  />
                      <StatCard label="On Leave" value={dayData.onLeave}  sub="approved"       valueClass="text-violet-600" />
                    </div>

                    {/* Records table */}
                    <Card className="rounded-xl border border-zinc-200 shadow-none overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[500px]">
                          <thead>
                            <tr className="border-b border-zinc-100 bg-zinc-50">
                              {["S.No.", "Staff Member", "Check In", "Check Out", "Hours", "Status"].map((h) => (
                                <th key={h} className="px-4 sm:px-5 py-4 text-left text-sm font-medium text-zinc-500 whitespace-nowrap">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {dayData.records.map((r, i) => (
                              <tr
                                key={i}
                                className={`hover:bg-zinc-50 transition-colors ${i < dayData.records.length - 1 ? "border-b border-zinc-100" : ""}`}
                              >
                                <td className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-400 whitespace-nowrap">{i + 1}</td>
                                <td className="px-4 sm:px-5 py-4 sm:py-5 whitespace-nowrap">
                                  <div className="flex items-center gap-2 sm:gap-3">
                                    <Av initials={r.avatar} />
                                    <span className="text-sm sm:text-base font-medium text-zinc-900">{r.emp}</span>
                                  </div>
                                </td>
                                <td className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-900 font-mono whitespace-nowrap">{r.checkIn}</td>
                                <td className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-900 font-mono whitespace-nowrap">{r.checkOut}</td>
                                <td className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-400 font-mono whitespace-nowrap">{r.hours}</td>
                                <td className="px-4 sm:px-5 py-4 sm:py-5 whitespace-nowrap"><StatusBadge status={r.status} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}