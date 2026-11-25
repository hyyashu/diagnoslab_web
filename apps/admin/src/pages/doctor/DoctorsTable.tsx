"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Trash2, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  doctors: any[];
  onView: (doctor: any) => void;
  onDelete: (name: string) => void;
}

export default function DoctorsTable({
  doctors,
  onView,
  onDelete,
}: Props) {
  return (
    <div className="border rounded-lg bg-white">

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {doctors.length > 0 ? (
              doctors.map((d: any, i) => (
                <TableRow key={i} className="hover:bg-slate-50">

                  <TableCell className="font-medium flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    {d.name}
                  </TableCell>

                  <TableCell>{d.specialization}</TableCell>
                  <TableCell>{d.phone}</TableCell>
                  <TableCell>{d.email}</TableCell>

                  <TableCell>
                    <ActiveBadge isActive={d.isActive} />
                  </TableCell>

                  <TableCell className="text-right">
                    <ActionMenu
                      doctor={d}
                      onView={onView}
                      onDelete={onDelete}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <EmptyRow />
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="sm:hidden divide-y">
        {doctors.length > 0 ? (
          doctors.map((d: any, i) => (
            <div key={i} className="p-4 space-y-3">

              {/* Top Row */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    {d.name}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {d.specialization}
                  </p>
                </div>

                <ActionMenu
                  doctor={d}
                  onView={onView}
                  onDelete={onDelete}
                />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Info label="Phone" value={d.phone} />
                <Info label="Email" value={d.email} />
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <ActiveBadge isActive={d.isActive} />
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-500">
            No doctors found.
          </div>
        )}
      </div>

    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function ActiveBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge
      className={
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium break-words">{value || "-"}</p>
    </div>
  );
}

function ActionMenu({
  doctor,
  onView,  
  onDelete,
}: {
  doctor: any;
  onView: (doctor: any) => void;
  onDelete: (name: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(doctor)}>
          <Eye className="w-4 h-4 mr-2" />
          View
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => onDelete(doctor.name)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EmptyRow() {
  return (
    <TableRow>
      <TableCell
        colSpan={6}
        className="text-center py-8 text-slate-500"
      >
        No doctors found.
      </TableCell>
    </TableRow>
  );
}