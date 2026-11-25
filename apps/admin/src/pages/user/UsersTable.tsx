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
import StatusBadge from "@/components/common/StatusBadge";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Eye, Mail, Trash2 } from "lucide-react";

interface Props {
  users: any[];
  onView: (user: any) => void;
  onDelete: (username: string) => void;
}

export default function UsersTable({ users, onView, onDelete }: Props) {
  return (
    <div className="border rounded-md bg-white">

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((u, i) => (
              <TableRow key={i}>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>
                  <StatusBadge status={u.status as any} />
                </TableCell>
                <TableCell>{u.role}</TableCell>

                <TableCell className="text-right">
                  <ActionMenu user={u} onView={onView} onDelete={onDelete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="sm:hidden divide-y">
        {users.map((u, i) => (
          <div key={i} className="p-4 space-y-3">

            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-xs text-muted-foreground">
                  @{u.username}
                </p>
              </div>

              <ActionMenu user={u} onView={onView} onDelete={onDelete} />
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Info label="Email" value={u.email} />
              <Info label="Phone" value={u.phone} />
              <Info label="Role" value={u.role} />
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <StatusBadge status={u.status as any} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium wrap-break-word">{value || "-"}</p>
    </div>
  );
}

function ActionMenu({
  user,
  onView,
  onDelete,
}: {
  user: any;
  onView: (user: any) => void;
  onDelete: (username: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(user)}>
          <Eye className="w-4 h-4 mr-2" />
          View details
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Mail className="w-4 h-4 mr-2" />
          Send email
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600"
          onClick={() => onDelete(user.username)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}