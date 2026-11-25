import { z } from 'zod';

// Maps to: meetings table — omits id (serial PK), createdAt (server default)
export const CreateMeetingSchema = z.object({
  employeeId: z.number().int(),
  doctorId: z.number().int(),
  meetingAt: z.iso.datetime().transform((val) => new Date(val)),
  scheduledBy: z.number().int().optional(),
  meetingNotes: z.string().optional(),
  meetingStatus: z.string(),
});

export const UpdateMeetingSchema = CreateMeetingSchema.partial();

export type CreateMeetingInput = z.infer<typeof CreateMeetingSchema>;
export type UpdateMeetingInput = z.infer<typeof UpdateMeetingSchema>;
