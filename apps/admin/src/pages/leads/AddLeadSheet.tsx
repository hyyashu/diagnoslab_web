import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCreateLead } from "./useLeadsApi";

/* The API maps these to a channel (see apps/api lead-derive.ts). */
const sources = [
  ["phone call", "Phone call"],
  ["walk-in", "Walk-in"],
  ["whatsapp", "WhatsApp"],
  ["referral", "Referral / doctor"],
  ["website", "Website"],
] as const;

const empty = { name: "", phone: "", email: "", test: "", message: "", channel: "phone call" };

export default function AddLeadSheet({
  children,
  onCreated,
}: {
  children: React.ReactNode;
  onCreated: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const create = useCreateLead();
  const set = (k: keyof typeof empty) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const phoneOk = form.phone.replace(/\D/g, "").length >= 10;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOk) return;
    const source: Record<string, string> = { channel: form.channel };
    if (form.test.trim()) source.test_name = form.test.trim();
    create.mutate(
      {
        name: form.name.trim() || undefined,
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        message: form.message.trim() || undefined,
        source,
      },
      {
        onSuccess: (lead) => {
          setForm(empty);
          setOpen(false);
          onCreated(lead.id);
        },
      },
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-[420px]">
        <form onSubmit={submit} className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>Add lead</SheetTitle>
            <SheetDescription>For phone calls, walk-ins and WhatsApp enquiries.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-4 py-6">
            <Row label="Phone" id="al-phone">
              <Input id="al-phone" inputMode="tel" autoFocus value={form.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="98765 43210" />
            </Row>
            <Row label="Name" id="al-name">
              <Input id="al-name" value={form.name} onChange={(e) => set("name")(e.target.value)} />
            </Row>
            <Row label="How did they reach us?" id="al-src">
              <Select value={form.channel} onValueChange={set("channel")}>
                <SelectTrigger id="al-src">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sources.map(([v, l]) => (
                    <SelectItem key={v} value={v}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Row>
            <Row label="Interested in" id="al-test">
              <Input id="al-test" value={form.test} onChange={(e) => set("test")(e.target.value)} placeholder="e.g. Thyroid profile, USG abdomen" />
            </Row>
            <Row label="Email" id="al-email">
              <Input id="al-email" type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} />
            </Row>
            <Row label="Note" id="al-msg">
              <Input id="al-msg" value={form.message} onChange={(e) => set("message")(e.target.value)} />
            </Row>
          </div>

          <SheetFooter>
            <Button type="submit" className="w-full" disabled={!phoneOk || create.isPending}>
              Save lead
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
