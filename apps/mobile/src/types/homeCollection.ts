export type BookingStatus =
  | "assigned"
  | "accepted"
  | "on_the_way"
  | "collected"
  | "completed";

export type Booking = {
  id: string;
  patientName: string;
  phone: string;
  tests: string[];
  address: string;
  latitude: number;
  longitude: number;
  timeSlot: string;
  status: BookingStatus;
  /** Distance in km (optional, for "Nearby" filter) */
  distanceKm?: number;
  /** Whether marked urgent */
  urgent?: boolean;
  /** Slot type for filter: "morning" | "evening" */
  slotType?: "morning" | "evening";
};

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  assigned: "Pending",
  accepted: "Accepted",
  on_the_way: "On the Way",
  collected: "Sample Collected",
  completed: "Completed",
};

export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
  assigned: "#f59e0b",   // amber - Pending
  accepted: "#3b82f6",   // blue - Accepted
  on_the_way: "#8b5cf6", // violet - On the Way
  collected: "#06b6d4",  // cyan - Sample Collected
  completed: "#16a34a",  // green - Completed
};
