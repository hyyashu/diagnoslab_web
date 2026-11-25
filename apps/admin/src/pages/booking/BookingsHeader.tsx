"use client";
import PageHeader, { FilterBar } from "@/components/PageHeader";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, CalendarPlus } from "lucide-react";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  filterDoctor: string;
  setFilterDoctor: (val: string) => void;
  doctors: { name: string }[];
  onClear: () => void;
  onCreate: () => void;
}

export default function BookingsHeader({
  search,
  setSearch,
  filterDoctor,
  setFilterDoctor,
  doctors,
  onClear,
  onCreate,
}: Props) {
  return (
    <>
      <PageHeader
        title="Bookings"
        description="Doctor appointments and tests booked at the lab."
        actions={
          <Button onClick={onCreate} className="gap-2">
            <CalendarPlus className="size-4" />
            Create booking
          </Button>
        }
      />
      <FilterBar>
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search doctor or service" className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={filterDoctor} onValueChange={setFilterDoctor}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All doctors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All doctors</SelectItem>
            {doctors.map((d, i) => (
              <SelectItem key={i} value={d.name}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="ghost" onClick={onClear}>
          Clear
        </Button>
      </FilterBar>
    </>
  );
}
