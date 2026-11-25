import type { Booking } from "../types/homeCollection";
import { MOCK_BOOKINGS } from "../components/homeCollection/mockBookings";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Simulate network fetch. In production, replace with real API. */
export async function fetchHomeCollectionBookings(): Promise<Booking[]> {
  await delay(800);
  return [...MOCK_BOOKINGS];
}

export async function updateBookingStatus(
  bookingId: string,
  status: Booking["status"]
): Promise<Booking> {
  await delay(400);
  const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId);
  if (!booking) throw new Error("Booking not found");
  return { ...booking, status };
}
