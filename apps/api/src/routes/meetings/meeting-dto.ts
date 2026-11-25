import { createZodDto } from 'nestjs-zod';
import { CreateMeetingSchema, UpdateMeetingSchema } from '@diagno/schemas';

export class CreateMeetingDto extends createZodDto(CreateMeetingSchema) {}
export class UpdateMeetingDto extends createZodDto(UpdateMeetingSchema) {}
