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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Trash2, Stethoscope } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  bookings: any[];
  onView: (booking: any) => void;
  onCancel: (bookingNumber: string) => void;
}

export default function BookingsTable({ bookings, onView, onCancel }: Props) {
  return (
    <div className="bg-white border rounded-xl">

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking Number</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings.map((b) => (
              <TableRow key={b.bookingNumber}>
                <TableCell>{b.bookingNumber}</TableCell>

                <TableCell className="font-medium flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-primary" />
                  {b.bookingItems[0]?.doctorName}
                </TableCell>

                <TableCell>{b.bookingPatientId}</TableCell>
                <TableCell>{b.bookingItems[0]?.service}</TableCell>

                <TableCell>
                  <StatusBadge status={b.bookingStatus} />
                </TableCell>

                <TableCell className="text-right">
                  <ActionMenu
                    booking={b}
                    onView={onView}
                    onCancel={onCancel}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="sm:hidden divide-y">
        {bookings.map((b) => (
          <div key={b.bookingNumber} className="p-4 space-y-3">

            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground">
                  {b.bookingNumber}
                </p>
                <div className="flex items-center gap-2 font-medium">
                  <Stethoscope className="w-4 h-4 text-primary" />
                  {b.bookingItems[0]?.doctorName}
                </div>
              </div>

              <ActionMenu
                booking={b}
                onView={onView}
                onCancel={onCancel}
              />
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Info label="Patient" value={b.bookingPatientId} />
              <Info label="Service" value={b.bookingItems[0]?.service} />
              <div className="col-span-2">
                <StatusBadge status={b.bookingStatus} />
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
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}

function ActionMenu({
  booking,
  onView,
  onCancel,
}: {
  booking: any;
  onView: (booking: any) => void;
  onCancel: (bookingNumber: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(booking)}>
          <Eye className="w-4 h-4 mr-2" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onCancel(booking.bookingNumber)}
          className="text-red-600"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Cancel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}