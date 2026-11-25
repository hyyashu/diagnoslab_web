import { z } from 'zod';

// Maps to: doctors table — omits createdAt, updatedAt (server managed)
// Note: id is NOT omitted — doctors.id is integer PK (not serial/auto-increment), caller provides it
export const CreateDoctorSchema = z.object({
  id: z.number().int(),
  name: z.string().max(255),
  specialization: z.string().max(255).optional(),
  clinicName: z.string().max(255).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().max(255).optional(),
  address: z.string().optional(),
  area: z.string().max(100).optional(),
  pincode: z.string().max(10).optional(),
  isActive: z.boolean().optional().default(true),
  notes: z.string().optional(),
});

export const UpdateDoctorSchema = CreateDoctorSchema.partial();

export type CreateDoctorInput = z.infer<typeof CreateDoctorSchema>;
export type UpdateDoctorInput = z.infer<typeof UpdateDoctorSchema>;
