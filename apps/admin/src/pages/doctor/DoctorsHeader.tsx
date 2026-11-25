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
import { Search, Plus } from "lucide-react";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  specialization: string;
  setSpecialization: (val: string) => void;
  onAdd: () => void;
}

export default function DoctorsHeader({
  search,
  setSearch,
  status,
  setStatus,
  specialization,
  setSpecialization,
  onAdd,
}: Props) {
  return (
    <>
      <PageHeader
        title="Doctors"
        description="Referring doctors the team visits."
        actions={
          <Button onClick={onAdd} className="gap-2">
            <Plus className="size-4" />
            Add doctor
          </Button>
        }
      />
      <FilterBar>
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search doctor or specialisation" className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={specialization} onValueChange={setSpecialization}>
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Specialisation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All specialisations</SelectItem>
            <SelectItem value="Cardiologist">Cardiologist</SelectItem>
            <SelectItem value="Dermatologist">Dermatologist</SelectItem>
            <SelectItem value="Orthopedic">Orthopedic</SelectItem>
            <SelectItem value="General Physician">General Physician</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>
    </>
  );
}
