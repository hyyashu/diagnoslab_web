import { createZodDto } from 'nestjs-zod';
import { CreateDoctorSchema, UpdateDoctorSchema } from '@diagno/schemas';

export class CreateDoctorDto extends createZodDto(CreateDoctorSchema) {}
export class UpdateDoctorDto extends createZodDto(UpdateDoctorSchema) {}
