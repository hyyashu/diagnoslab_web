import { createZodDto } from 'nestjs-zod';
import { CreateStaffSchema, SetOverridesSchema, UpdateStaffSchema } from '@diagno/schemas';

export class CreateUserDto extends createZodDto(CreateStaffSchema) {}
export class UpdateUserDto extends createZodDto(UpdateStaffSchema) {}
export class SetOverridesDto extends createZodDto(SetOverridesSchema) {}
