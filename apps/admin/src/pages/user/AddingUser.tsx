"use client";

import { useMemo, useState } from "react";
import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/common/StatusBadge";

/* ---------------- MOCK DATA ---------------- */

const initialUsers = [
  {
    username: "freeman.dicki",
    name: "Freeman Dicki",
    email: "freeman83@gmail.com",
    phone: "+111",
    status: "Suspended",
    role: "Cashier",
  },
  {
    username: "nick",
    name: "Nick",
    email: "nick@gmail.com",
    phone: "+222",
    status: "Active",
    role: "Admin",
  },
];

export default function AddingUser() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "view">("add");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  /* ---------------- FILTER ---------------- */

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "all" || u.status === status;
      const matchRole = role === "all" || u.role === role;

      return matchSearch && matchStatus && matchRole;
    });
  }, [users, search, status, role]);

  /* ---------------- ADD USER ---------------- */

  const handleAddUser = () => {
    if (!form.username) return;

    setUsers((prev: any) => [
      ...prev,
      { ...form, status: form.status || "Active" },
    ]);

    setForm({});
    setSheetOpen(false);
  };

  return (
    <div className="space-y-5">

      <UsersHeader
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
        onAdd={() => {
          setMode("add");
          setSelectedUser(null);
          setSheetOpen(true);
        }}
      />

      <UsersTable
        users={filteredUsers}
        onView={(user) => {
          setSelectedUser(user);
          setMode("view");
          setSheetOpen(true);
        }}
        onDelete={(username) =>
          setUsers((prev) =>
            prev.filter((x) => x.username !== username)
          )
        }
      />

      {/* ================= SHEET ================= */}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-md h-full flex flex-col p-0">
        <SheetHeader className="sr-only">
            <SheetTitle>{mode === "add" ? "Add User" : "User Details"}</SheetTitle>
            <SheetDescription>{mode === "add" ? "Add User" : "User Details"}</SheetDescription>
          </SheetHeader>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-6 py-6">

            {mode === "add" ? (
              <div className="flex flex-col gap-5">

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    placeholder="Enter username"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        username: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    placeholder="Enter full name"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Phone
                  </label>
                  <Input
                    placeholder="Enter phone number"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Role
                  </label>
                  <Select
                    onValueChange={(v) =>
                      setForm({ ...form, role: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">
                        Admin
                      </SelectItem>
                      <SelectItem value="Cashier">
                        Cashier
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>
            ) : (
              selectedUser && (
                <div className="flex flex-col gap-6">

                  {/* USER HEADER */}
                  <div className="border rounded-lg p-4 bg-muted/30 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold">
                        {selectedUser.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{selectedUser.username}
                      </p>
                    </div>

                    <StatusBadge
                      status={selectedUser.status}
                    />
                  </div>

                  {/* DETAILS FLEX WRAP */}
                  <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap">

                    <div className="flex flex-col gap-1 sm:w-[48%]">
                      <p className="text-muted-foreground">
                        Email
                      </p>
                      <p className="font-medium wrap-break-word">
                        {selectedUser.email}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 sm:w-[48%]">
                      <p className="text-muted-foreground">
                        Phone
                      </p>
                      <p className="font-medium">
                        {selectedUser.phone}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 sm:w-[48%]">
                      <p className="text-muted-foreground">
                        Role
                      </p>
                      <p className="font-medium">
                        {selectedUser.role}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 sm:w-[48%]">
                      <p className="text-muted-foreground">
                        Account Status
                      </p>
                      <StatusBadge
                        status={selectedUser.status}
                      />
                    </div>

                  </div>

                </div>
              )
            )}

          </div>

          {/* FOOTER */}
          <SheetFooter className="border-t px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setSheetOpen(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>

            {mode === "add" && (
              <Button
                onClick={handleAddUser}
                className="w-full sm:w-auto"
              >
                Create User
              </Button>
            )}
          </SheetFooter>

        </SheetContent>
      </Sheet>

    </div>
  );
}