import { z } from 'zod';

// Audit log is write-only (written by AuditInterceptor). Response schema for future GET endpoints.
export const AuditLogResponseSchema = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  action: z.string(),
  entityType: z.string(),
  entityId: z.union([z.string(), z.number()]),
  oldValue: z.any().nullable(),
  newValue: z.any().nullable(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  createdAt: z.string(),
});

export type AuditLogResponse = z.infer<typeof AuditLogResponseSchema>;
