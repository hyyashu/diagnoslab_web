"use client";

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

interface Props {
  doctors: { name: string }[];
  createSheetOpen: boolean;
  setCreateSheetOpen: (val: boolean) => void;
  viewSheetOpen: boolean;
  setViewSheetOpen: (val: boolean) => void;
  form: any;
  setForm: any;
  selectedBooking: any;
  onCreate: () => void;
}

export default function BookingSheets({
  doctors,
  createSheetOpen,
  setCreateSheetOpen,
  viewSheetOpen,
  setViewSheetOpen,
  form,
  setForm,
  selectedBooking,
  onCreate,
}: Props) {
  return (
    <>
      {/* ================= VIEW SHEET ================= */}
      <Sheet open={viewSheetOpen} onOpenChange={setViewSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg h-full flex flex-col p-0">

          {/* HEADER */}
          <SheetHeader className="sr-only">
            <SheetTitle>Booking Details</SheetTitle>
            <SheetDescription>View booking details</SheetDescription>
          </SheetHeader>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm">

            {selectedBooking && (
              <>
                {/* BASIC INFO */}
                <div className="border rounded-lg p-4 bg-muted/40 space-y-4">
                  <h3 className="font-medium">Basic Information</h3>

                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <div className="flex-1 min-w-[140px]">
                    <p className="text-muted-foreground">Booking No</p>
                      <p className="font-medium">
                        {selectedBooking.bookingNumber}
                      </p>
                  </div>

                    <div className="flex-1 min-w-[140px]">
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium">
                        {selectedBooking.bookingStatus}
                      </p>
                    </div>

                    <div className="flex-1 min-w-[140px]">
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {selectedBooking.bookingDate}
                      </p>
                    </div>

                    <div className="flex-1 min-w-[140px]">
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-medium">
                        ₹ {selectedBooking.bookingTotal}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DOCTOR & PATIENT */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Doctor & Patient</h3>

                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <div className="flex-1 min-w-[140px]">
                      <p className="text-muted-foreground">Doctor</p>
                      <p className="font-medium">
                        {selectedBooking.bookingItems[0]?.doctorName}
                      </p>
                    </div>

                    <div className="flex-1 min-w-[140px]">
                      <p className="text-muted-foreground">Service</p>
                      <p className="font-medium">
                        {selectedBooking.bookingItems[0]?.service}
                      </p>
                    </div>

                    <div className="flex-1 min-w-[140px]">
                      <p className="text-muted-foreground">Patient ID</p>
                      <p className="font-medium">
                        {selectedBooking.bookingPatientId}
                      </p>
                    </div>

                    <div className="flex-1 min-w-[140px]">
                      <p className="text-muted-foreground">Booked By</p>
                      <p className="font-medium">
                        {selectedBooking.bookedBy}
                      </p>
                    </div>
                  </div>
                </div>

                {/* NOTES */}
                <div className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-medium">Notes</h3>
                  <p className="text-muted-foreground">
                    {selectedBooking.bookingNotes || "No notes available"}
                  </p>
                </div>

                {/* AUDIT */}
                <div className="border rounded-lg p-4 bg-muted/40 space-y-3">
                  <h3 className="font-medium">Audit Info</h3>

                  <div>
                    <p className="text-muted-foreground">Created At</p>
                    <p className="font-medium">
                      {selectedBooking.bookingCreatedAt}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Updated At</p>
                    <p className="font-medium">
                      {selectedBooking.bookingUpdatedAt}
                    </p>
                  </div>
                </div>
              </>
            )}

          </div>
        </SheetContent>
      </Sheet>

      {/* ================= CREATE SHEET ================= */}
      <Sheet open={createSheetOpen} onOpenChange={setCreateSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg h-full flex flex-col p-0">

          {/* HEADER */}
          <SheetHeader className="sr-only">
            <SheetTitle>Create Booking</SheetTitle>
            <SheetDescription>Create a new booking</SheetDescription>
          </SheetHeader>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 text-sm">

            {/* DOCTOR */}
            <div className="space-y-2">
              <label className="font-medium">Doctor *</label>
              <Select
                value={form.doctorName || ""}
                onValueChange={(value) =>
                  setForm({ ...form, doctorName: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((d, i) => (
                    <SelectItem key={i} value={d.name}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* SERVICE */}
            <div className="space-y-2">
              <label className="font-medium">Service *</label>
              <Input
                value={form.service || ""}
                onChange={(e) =>
                  setForm({ ...form, service: e.target.value })
                }
              />
            </div>

            {/* PATIENT */}
            <div className="space-y-2">
              <label className="font-medium">Patient ID *</label>
              <Input
                type="number"
                value={form.bookingPatientId || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bookingPatientId: e.target.value,
                  })
                }
              />
            </div>

            {/* DATE */}
            <div className="space-y-2">
              <label className="font-medium">Booking Date *</label>
              <Input
                type="date"
                value={form.bookingDate || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bookingDate: e.target.value,
                  })
                }
              />
            </div>

            {/* AMOUNT */}
            <div className="space-y-2">
              <label className="font-medium">Total Amount *</label>
              <Input
                type="number"
                value={form.bookingTotal || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bookingTotal: e.target.value,
                  })
                }
              />
            </div>

            {/* STATUS */}
            <div className="space-y-2">
              <label className="font-medium">Booking Status *</label>
              <Select
                value={form.bookingStatus || ""}
                onValueChange={(value) =>
                  setForm({ ...form, bookingStatus: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* NOTES */}
            <div className="space-y-2">
              <label className="font-medium">Notes</label>
              <Input
                value={form.bookingNotes || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bookingNotes: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* FOOTER */}
          <SheetFooter className="border-t px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setCreateSheetOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              onClick={onCreate}
              className="w-full sm:w-auto"
              disabled={
                !form.doctorName ||
                !form.service ||
                !form.bookingPatientId ||
                !form.bookingDate ||
                !form.bookingTotal ||
                !form.bookingStatus
              }
            >
              Confirm Booking
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}