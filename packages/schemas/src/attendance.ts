import { z } from 'zod';

export const attendanceStatusValues = [
  'present', 'absent', 'leave', 'holiday', 'weekend', 'other',
] as const;

export const AttendanceStatusEnum = z.enum(attendanceStatusValues);

// Maps to: attendance table — omits id (uuid defaultRandom), createdAt
export const CreateAttendanceSchema = z.object({
  employeeId: z.number().int(),
  date: z.string(),
  status: AttendanceStatusEnum,
  checkInAt: z.iso.datetime().transform((val) => new Date(val)).optional(),
  checkOutAt: z.iso.datetime().transform((val) => new Date(val)).optional(),
  checkInLocation: z.any().optional(),
  checkOutLocation: z.any().optional(),
  notes: z.string().optional(),
});

export const UpdateAttendanceSchema = CreateAttendanceSchema.partial();

export type CreateAttendanceInput = z.infer<typeof CreateAttendanceSchema>;
export type UpdateAttendanceInput = z.infer<typeof UpdateAttendanceSchema>;
