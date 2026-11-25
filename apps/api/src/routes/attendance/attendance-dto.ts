import { createZodDto } from 'nestjs-zod';
import { CreateAttendanceSchema, UpdateAttendanceSchema } from '@diagno/schemas';

export class CreateAttendanceDto extends createZodDto(CreateAttendanceSchema) {}
export class UpdateAttendanceDto extends createZodDto(UpdateAttendanceSchema) {}
