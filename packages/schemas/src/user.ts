import { z } from "zod";

/* A const object rather than a TS enum, so apps built with
   erasableSyntaxOnly (admin) can import this file. */
export const Role = {
  SUPERADMIN: "superadmin",
  USER: "user",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const CreateUserSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
  password: z.string().min(4),
  role: z.enum(Role).optional().default(Role.USER),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
