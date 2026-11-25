import { createZodDto } from 'nestjs-zod';
import { CreateProductSchema, UpdateProductSchema } from '@diagno/schemas';

export class CreateProductDto extends createZodDto(CreateProductSchema) {}
export class UpdateProductDto extends createZodDto(UpdateProductSchema) {}
