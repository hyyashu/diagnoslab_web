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
import { Search, Plus, CircleFadingArrowUp } from "lucide-react";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  onAdd: () => void;
}

export default function UsersHeader({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus,
  onAdd,
}: Props) {
  return (
    <>
      <PageHeader
        title="Users"
        description="Staff who can sign in to the admin and the app."
        actions={
          <>
            <Button variant="outline" className="gap-2">
              <CircleFadingArrowUp className="size-4" />
              Export
            </Button>
            <Button onClick={onAdd} className="gap-2">
              <Plus className="size-4" />
              Add user
            </Button>
          </>
        }
      />
      <FilterBar>
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search users" className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Cashier">Cashier</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>
    </>
  );
}
