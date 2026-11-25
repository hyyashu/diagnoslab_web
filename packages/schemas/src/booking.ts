import { z } from 'zod';

// Maps to: bookings table — omits id, bookingCreatedAt, bookingUpdatedAt
export const CreateBookingSchema = z.object({
  bookingNumber: z.string(),
  bookingItems: z.any(),
  bookedBy: z.number().int().optional(),
  bookingPatientId: z.number().int().optional(),
  bookingDate: z.iso.datetime().transform((val) => new Date(val)),
  bookingTotal: z.number().int(),
  bookingStatus: z.string(),
  bookingNotes: z.string().optional(),
});

export const UpdateBookingSchema = CreateBookingSchema.partial();

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
export type UpdateBookingInput = z.infer<typeof UpdateBookingSchema>;
