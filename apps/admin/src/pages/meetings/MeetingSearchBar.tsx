"use client";

import type { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  type: "upcoming" | "history";

  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  employee?: string;
  setEmployee?: Dispatch<SetStateAction<string>>;

  client?: string;
  setClient?: Dispatch<SetStateAction<string>>;

  date?: Date | undefined;
  setDate?: Dispatch<SetStateAction<Date | undefined>>;
}

export default function MeetingSearchBar({
  type,
  search,
  setSearch,
  employee,
  setEmployee,
  client,
  setClient,
  date,
  setDate,
}: Props) {
  return (
    <div
      className="border rounded-xl p-4 bg-white 
                    flex flex-col sm:flex-row 
                    flex-wrap items-stretch sm:items-center 
                    gap-3"
    >
      {/* 🔍 Search */}
      <div className="relative w-full sm:w-64">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder={
            type === "upcoming" ? "Search employee..." : "Search history..."
          }
          className="pl-9 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔥 History Filters */}
      {type === "history" && (
        <>
          {/* Employee Filter */}
          <Select value={employee} onValueChange={setEmployee}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              <SelectItem value="Rahul Sharma">Rahul Sharma</SelectItem>
              <SelectItem value="Anita Verma">Anita Verma</SelectItem>
            </SelectContent>
          </Select>

          {/* Client Filter */}
          <Select value={client} onValueChange={setClient}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="ABC Medical">ABC Medical</SelectItem>
              <SelectItem value="Health Care Center">
                Health Care Center
              </SelectItem>
            </SelectContent>
          </Select>

          
          {/* 📅 Calendar Filter */}
          <div className="w-full sm:w-auto sm:ml-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-[200px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0 z-[9999]" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  captionLayout="dropdown"
                  fromYear={2020}
                  toYear={2035}
                  initialFocus
                  className="w-[260px]"
                />
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
    </div>
  );
}
