import { z } from "zod";

export const leadSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  number: z.string().nullable(),
  email: z.string().nullable(),
  message: z.string().nullable(),
  source: z.string().nullable(),
  status: z.string().nullable(),
  date: z.string(),
  timestamp: z.string(),
});
