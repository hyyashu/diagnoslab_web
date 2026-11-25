import { createZodDto } from 'nestjs-zod';
import { CreateUserSchema } from '@diagno/schemas';

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class UpdateUserDto extends createZodDto(CreateUserSchema.partial()) {}
