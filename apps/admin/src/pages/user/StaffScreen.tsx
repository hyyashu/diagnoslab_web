import { Fragment, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";
import { Check, KeyRound, Minus, Plus, Search, ShieldCheck, Wand2 } from "lucide-react";
import { toast } from "sonner";
import type { Permission, RoleName } from "@diagno/schemas";
import PageHeader, { FilterBar } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { errorMessage } from "../leads/useLeadsApi";

/* ---------- Data ---------- */

type Staff = {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  overrides: { permission: Permission; granted: boolean }[];
  permissions: Permission[];
};
type Catalog = {
  roles: { id: RoleName; label: string; description: string; permissions: Permission[] }[];
  permissions: { id: Permission; group: string; label: string }[];
};

const get = async <T,>(url: string) => (await api.get<{ data: T }>(url)).data.data;

function useStaffWrite<V>(fn: (v: V) => Promise<unknown>, success: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["staff"] });
      qc.invalidateQueries({ queryKey: ["leads", "owners"] });
      toast.success(success);
    },
    onError: (e) => toast.error(errorMessage(e)),
  });
}

/* A readable temporary password: 3 words-ish chunks, 12 characters. */
function tempPassword() {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

const roleTone: Record<string, string> = {
  superadmin: "bg-zinc-900 text-white ring-zinc-900",
  manager: "bg-violet-50 text-violet-700 ring-violet-200",
  front_desk: "bg-blue-50 text-blue-700 ring-blue-200",
  field: "bg-amber-50 text-amber-800 ring-amber-200",
  lab: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

/* ---------- Page ---------- */

export default function StaffScreen() {
  const [tab, setTab] = useState<"staff" | "roles">("staff");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Staff | null>(null);
  const [adding, setAdding] = useState(false);

  const staff = useQuery({ queryKey: ["staff"], queryFn: () => get<Staff[]>("/users") });
  const catalog = useQuery({ queryKey: ["staff", "catalog"], queryFn: () => get<Catalog>("/users/access-catalog"), staleTime: Infinity });
  const roleLabel = (id: string) => catalog.data?.roles.find((r) => r.id === id)?.label ?? id;

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (staff.data ?? []).filter((s) => !q || `${s.name} ${s.email} ${roleLabel(s.role)}`.toLowerCase().includes(q));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff.data, query, catalog.data]);

  // Keep the open sheet in sync after saves.
  useEffect(() => {
    if (editing) setEditing(staff.data?.find((s) => s.id === editing.id) ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff.data]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Staff & access"
        description="Who can sign in, their role, and anything extra or removed for one person."
        actions={
          tab === "staff" && (
            <Button onClick={() => setAdding(true)}>
              <Plus /> Add staff
            </Button>
          )
        }
      />

      <div className="inline-flex rounded-md border p-0.5">
        {(
          [
            ["staff", "Staff"],
            ["roles", "Roles"],
          ] as const
        ).map(([v, l]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={cn("rounded px-4 py-1.5 text-sm", tab === v ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === "staff" ? (
        <>
          <FilterBar>
            <div className="relative min-w-[220px] flex-1">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search name, email or role" className="pl-8" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </FilterBar>
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Access</TableHead>
                  <TableHead className="hidden md:table-cell">Last sign-in</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.isLoading &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5}>
                        <Skeleton className="h-8 w-full" />
                      </TableCell>
                    </TableRow>
                  ))}
                {shown.map((s) => (
                  <TableRow key={s.id} className="cursor-pointer" onClick={() => setEditing(s)}>
                    <TableCell>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.email}</div>
                    </TableCell>
                    <TableCell>
                      <RolePill role={s.role} label={roleLabel(s.role)} />
                    </TableCell>
                    <TableCell className="hidden text-sm md:table-cell">
                      {s.role === "superadmin" ? "Everything" : `${s.permissions.length} permissions`}
                      {s.overrides.length > 0 && (
                        <span className="ml-1.5 rounded bg-amber-100 px-1.5 py-px text-[11px] font-medium text-amber-800">
                          {s.overrides.length} custom
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {s.lastLoginAt ? formatDistanceToNowStrict(new Date(s.lastLoginAt), { addSuffix: true }) : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                          s.isActive ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-zinc-100 text-zinc-500 ring-zinc-200",
                        )}
                      >
                        {s.isActive ? "Active" : "Switched off"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        catalog.data && <RoleMatrix catalog={catalog.data} />
      )}

      {catalog.data && <AddStaffSheet open={adding} onClose={() => setAdding(false)} catalog={catalog.data} />}
      {catalog.data && <EditStaffSheet staff={editing} onClose={() => setEditing(null)} catalog={catalog.data} />}
    </div>
  );
}

function RolePill({ role, label }: { role: string; label: string }) {
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset", roleTone[role] ?? "bg-muted ring-border")}>
      {label}
    </span>
  );
}

/* ---------- Roles tab: the matrix ---------- */

function RoleMatrix({ catalog }: { catalog: Catalog }) {
  const groups = [...new Set(catalog.permissions.map((p) => p.group))];
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {catalog.roles.map((r) => (
          <div key={r.id} className="rounded-lg border bg-card p-3">
            <RolePill role={r.id} label={r.label} />
            <p className="mt-2 text-xs text-muted-foreground">{r.description}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[260px]">Permission</TableHead>
              {catalog.roles.map((r) => (
                <TableHead key={r.id} className="text-center">
                  {r.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((g) => (
              <Fragment key={g}>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableCell colSpan={catalog.roles.length + 1} className="py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {g}
                  </TableCell>
                </TableRow>
                {catalog.permissions
                  .filter((p) => p.group === g)
                  .map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-sm">{p.label}</TableCell>
                      {catalog.roles.map((r) => (
                        <TableCell key={r.id} className="text-center">
                          {r.permissions.includes(p.id) ? (
                            <Check className="mx-auto size-4 text-emerald-600" />
                          ) : (
                            <Minus className="mx-auto size-4 text-muted-foreground/40" />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">
        These are each role's defaults. To give one person something extra, or take something away, open them in the Staff tab.
      </p>
    </div>
  );
}

/* ---------- Add ---------- */

function RoleSelect({ value, onChange, catalog, disabled }: { value: string; onChange: (v: RoleName) => void; catalog: Catalog; disabled?: boolean }) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as RoleName)} disabled={disabled}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {catalog.roles.map((r) => (
          <SelectItem key={r.id} value={r.id}>
            {r.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function PasswordField({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="flex gap-2">
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder ?? "At least 8 characters"} autoComplete="new-password" />
      <Button type="button" variant="outline" onClick={() => onChange(tempPassword())} title="Make a password">
        <Wand2 /> Make one
      </Button>
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function AddStaffSheet({ open, onClose, catalog }: { open: boolean; onClose: () => void; catalog: Catalog }) {
  const empty = { name: "", email: "", password: "", role: "front_desk" as RoleName };
  const [f, setF] = useState(empty);
  const create = useStaffWrite((v: typeof empty) => api.post("/users", v), "Staff member added");
  const role = catalog.roles.find((r) => r.id === f.role);
  const valid = f.name.trim() && /\S+@\S+\.\S+/.test(f.email) && f.password.length >= 8;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-[440px]">
        <form
          className="flex h-full flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            create.mutate(f, {
              onSuccess: () => {
                navigator.clipboard?.writeText(`${f.email}\n${f.password}`).catch(() => {});
                toast.message("Sign-in details copied", { description: "Send them to the person privately." });
                setF(empty);
                onClose();
              },
            });
          }}
        >
          <SheetHeader>
            <SheetTitle>Add staff</SheetTitle>
            <SheetDescription>They sign in at app.diagnoslab.in and in the staff app.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 space-y-4 py-6">
            <Field label="Name">
              <Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoFocus />
            </Field>
            <Field label="Email (used to sign in)">
              <Input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            </Field>
            <Field label="Role" hint={role?.description}>
              <RoleSelect value={f.role} onChange={(role) => setF({ ...f, role })} catalog={catalog} />
            </Field>
            <Field label="Temporary password" hint="Copied for you after saving. Ask them to keep it private.">
              <PasswordField value={f.password} onChange={(password) => setF({ ...f, password })} />
            </Field>
          </div>
          <SheetFooter>
            <Button type="submit" className="w-full" disabled={!valid || create.isPending}>
              Add staff member
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

/* ---------- Edit: role, status, password, exceptions ---------- */

type Choice = "default" | "allow" | "remove";

function EditStaffSheet({ staff, onClose, catalog }: { staff: Staff | null; onClose: () => void; catalog: Catalog }) {
  return (
    <Sheet open={!!staff} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-[560px]">
        {staff && <EditBody key={staff.id + staff.role + staff.overrides.length} staff={staff} catalog={catalog} />}
      </SheetContent>
    </Sheet>
  );
}

function EditBody({ staff, catalog }: { staff: Staff; catalog: Catalog }) {
  const me = useAuthStore((s) => s.user);
  const isMe = me?.id === staff.id;
  const isOwner = staff.role === "superadmin";
  const [name, setName] = useState(staff.name);
  const [email, setEmail] = useState(staff.email);
  const [password, setPassword] = useState("");
  const update = useStaffWrite((v: Record<string, unknown>) => api.patch(`/users/${staff.id}`, v), "Saved");
  const saveAccess = useStaffWrite(
    (overrides: { permission: Permission; granted: boolean }[]) => api.put(`/users/${staff.id}/permissions`, { overrides }),
    "Access updated",
  );

  const defaults = new Set(catalog.roles.find((r) => r.id === staff.role)?.permissions ?? []);
  const [choices, setChoices] = useState<Record<string, Choice>>(() =>
    Object.fromEntries(staff.overrides.map((o) => [o.permission, o.granted ? "allow" : "remove"])),
  );
  const changed = JSON.stringify(choices) !== JSON.stringify(Object.fromEntries(staff.overrides.map((o) => [o.permission, o.granted ? "allow" : "remove"])));
  const groups = [...new Set(catalog.permissions.map((p) => p.group))];

  return (
    <div className="space-y-6">
      <SheetHeader className="text-left">
        <SheetTitle className="flex items-center gap-2">
          {staff.name} <RolePill role={staff.role} label={catalog.roles.find((r) => r.id === staff.role)?.label ?? staff.role} />
        </SheetTitle>
        <SheetDescription>
          {staff.isActive ? "Active" : "Switched off"} · last sign-in{" "}
          {staff.lastLoginAt ? formatDistanceToNowStrict(new Date(staff.lastLoginAt), { addSuffix: true }) : "never"}
        </SheetDescription>
      </SheetHeader>

      <section className="space-y-3">
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Email">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Button
          size="sm"
          variant="outline"
          disabled={(name === staff.name && email === staff.email) || update.isPending}
          onClick={() => update.mutate({ name: name.trim(), email: email.trim() })}
        >
          Save details
        </Button>
      </section>

      <section className="space-y-2 border-t pt-5">
        <h3 className="text-sm font-semibold">Role</h3>
        <RoleSelect
          value={staff.role}
          catalog={catalog}
          disabled={isMe}
          onChange={(role) => {
            if (role !== staff.role) update.mutate({ role });
          }}
        />
        <p className="text-xs text-muted-foreground">
          {isMe ? "You can't change your own role." : "Changing the role signs them out so the new access applies at once."}
        </p>
      </section>

      <section className="space-y-2 border-t pt-5">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold">
          <KeyRound className="size-4" /> Reset password
        </h3>
        <PasswordField value={password} onChange={setPassword} placeholder="New password" />
        <Button
          size="sm"
          variant="outline"
          disabled={password.length < 8 || update.isPending}
          onClick={() =>
            update.mutate(
              { password },
              {
                onSuccess: () => {
                  navigator.clipboard?.writeText(password).catch(() => {});
                  toast.message("New password copied", { description: "They're signed out everywhere." });
                  setPassword("");
                },
              },
            )
          }
        >
          Set new password
        </Button>
      </section>

      <section className="space-y-3 border-t pt-5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold">
            <ShieldCheck className="size-4" /> Access
          </h3>
          {!isOwner && (
            <Button size="sm" disabled={!changed || saveAccess.isPending} onClick={() =>
              saveAccess.mutate(
                Object.entries(choices)
                  .filter(([, c]) => c !== "default")
                  .map(([permission, c]) => ({ permission: permission as Permission, granted: c === "allow" })),
              )
            }>
              Save access
            </Button>
          )}
        </div>
        {isOwner ? (
          <p className="text-sm text-muted-foreground">The owner always has everything.</p>
        ) : (
          <>
            <p className="text-xs text-muted-foreground">
              "Role" follows the role's default. Use Allow or Remove only for exceptions for this person.
            </p>
            {groups.map((g) => (
              <div key={g} className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{g}</div>
                <ul className="divide-y rounded-md border">
                  {catalog.permissions
                    .filter((p) => p.group === g)
                    .map((p) => {
                      const c = choices[p.id] ?? "default";
                      const has = c === "allow" || (c === "default" && defaults.has(p.id));
                      return (
                        <li key={p.id} className="flex items-center justify-between gap-3 px-3 py-2">
                          <span className="flex min-w-0 items-center gap-2 text-sm">
                            {has ? <Check className="size-4 shrink-0 text-emerald-600" /> : <Minus className="size-4 shrink-0 text-muted-foreground/50" />}
                            <span className={cn(!has && "text-muted-foreground")}>{p.label}</span>
                          </span>
                          <div className="inline-flex shrink-0 rounded-md border p-0.5 text-xs">
                            {(
                              [
                                ["default", defaults.has(p.id) ? "Role ✓" : "Role –"],
                                ["allow", "Allow"],
                                ["remove", "Remove"],
                              ] as const
                            ).map(([v, l]) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setChoices((x) => ({ ...x, [p.id]: v }))}
                                className={cn(
                                  "rounded px-2 py-0.5",
                                  c === v
                                    ? v === "allow"
                                      ? "bg-emerald-600 text-white"
                                      : v === "remove"
                                        ? "bg-rose-600 text-white"
                                        : "bg-primary text-primary-foreground"
                                    : "text-muted-foreground",
                                )}
                              >
                                {l}
                              </button>
                            ))}
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </>
        )}
      </section>

      <section className="space-y-2 border-t pt-5 pb-2">
        <h3 className="text-sm font-semibold">{staff.isActive ? "Switch off account" : "Switch account back on"}</h3>
        <p className="text-xs text-muted-foreground">
          {staff.isActive
            ? "They're signed out at once and can't sign in. Their name stays on leads and history."
            : "They can sign in again with their password."}
        </p>
        <Button
          size="sm"
          variant={staff.isActive ? "destructive" : "outline"}
          disabled={isMe || update.isPending}
          onClick={() => update.mutate({ isActive: !staff.isActive })}
        >
          {staff.isActive ? "Switch off" : "Switch on"}
        </Button>
      </section>
      <SheetFooter />
    </div>
  );
}
