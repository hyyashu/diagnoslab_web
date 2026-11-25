import { z } from 'zod';

// Maps to: products table — omits id, productCreatedAt, productUpdatedAt
// productPrice is z.string() because Drizzle maps PG decimal → TS string
export const CreateProductSchema = z.object({
  productName: z.string(),
  productDescription: z.string().optional(),
  productPrice: z.string(),
  productStatus: z.string(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
