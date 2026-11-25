import { createZodDto } from 'nestjs-zod';
import { CreateBookingSchema, UpdateBookingSchema } from '@diagno/schemas';

export class CreateBookingDto extends createZodDto(CreateBookingSchema) {}
export class UpdateBookingDto extends createZodDto(UpdateBookingSchema) {}
