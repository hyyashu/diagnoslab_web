"use client";

import { useMemo, useState } from "react";
import BookingsHeader from "./BookingsHeader";
import BookingsTable from "./BookingsTable";
import BookingSheets from "./BookingSheets";

/* ===== YOUR DUMMY DATA (UNCHANGED) ===== */

const doctors = [
  { name: "Dr. John Doe" },
  { name: "Dr. Sarah Smith" },
  { name: "Dr. Amit Kumar" },
];

const initialBookings = [
  {
    bookingNumber: "BK-1001",
    bookingItems: [
      { doctorName: "Dr. John Doe", service: "General Consultation", price: 500 },
    ],
    bookedBy: 1,
    bookingPatientId: 101,
    bookingDate: "2026-02-28",
    bookingTotal: 500,
    bookingStatus: "CONFIRMED",
    bookingNotes: "First time visit",
    bookingCreatedAt: "2026-02-28",
    bookingUpdatedAt: "2026-02-28",
  },
  {
    bookingNumber: "BK-1002",
    bookingItems: [
      { doctorName: "Dr. Sarah Smith", service: "Blood Test", price: 500 },
    ],
    bookedBy: 2,
    bookingPatientId: 102,
    bookingDate: "2026-02-28",
    bookingTotal: 500,
    bookingStatus: "PENDING",
    bookingNotes: "Blood Test",
    bookingCreatedAt: "2026-02-28",
    bookingUpdatedAt: "2026-02-28",
  },
];

export default function BookingsScreen() {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("all");

  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const [viewSheetOpen, setViewSheetOpen] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const doctorName = b.bookingItems[0]?.doctorName || "";
      const service = b.bookingItems[0]?.service || "";

      const matchSearch =
        doctorName.toLowerCase().includes(search.toLowerCase()) ||
        service.toLowerCase().includes(search.toLowerCase());

      const matchDoctor =
        filterDoctor === "all" || doctorName === filterDoctor;

      return matchSearch && matchDoctor;
    });
  }, [bookings, search, filterDoctor]);

  const handleCreateBooking = () => {
    const newBooking = {
      ...form,
      bookingNumber: `BK-${Date.now()}`,
      bookingItems: [
        {
          doctorName: form.doctorName,
          service: form.service,
          price: Number(form.bookingTotal),
        },
      ],
      bookingCreatedAt: new Date().toISOString(),
      bookingUpdatedAt: new Date().toISOString(),
    };

    setBookings((prev) => [...prev, newBooking]);
    setForm({});
    setCreateSheetOpen(false);
  };

  const handleCancel = (bookingNumber: string) => {
    setBookings((prev) =>
      prev.filter((b) => b.bookingNumber !== bookingNumber)
    );
  };

  const handleView = (booking: any) => {
    setSelectedBooking(booking);
    setViewSheetOpen(true);
  };

  return (
    <div className="space-y-5">
      <BookingsHeader
        search={search}
        setSearch={setSearch}
        filterDoctor={filterDoctor}
        setFilterDoctor={setFilterDoctor}
        doctors={doctors}
        onClear={() => {
          setSearch("");
          setFilterDoctor("all");
        }}
        onCreate={() => setCreateSheetOpen(true)}
      />

      <BookingsTable
        bookings={filteredBookings}
        onView={handleView}
        onCancel={handleCancel}
      />

      <BookingSheets
        doctors={doctors}
        createSheetOpen={createSheetOpen}
        setCreateSheetOpen={setCreateSheetOpen}
        viewSheetOpen={viewSheetOpen}
        setViewSheetOpen={setViewSheetOpen}
        form={form}
        setForm={setForm}
        selectedBooking={selectedBooking}
        onCreate={handleCreateBooking}
      />
    </div>
  );
}