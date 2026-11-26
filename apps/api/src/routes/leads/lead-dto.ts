import { createZodDto } from 'nestjs-zod';
import {
  AdminCreateLeadSchema,
  BookLeadSchema,
  WebsiteTapSchema,
  MatchTapSchema,
  CreateTaskSchema,
  LogActivitySchema,
  UpdateLeadSchema,
  UpdateTaskSchema,
} from '@diagno/schemas';

/* POST /leads (public: website forms and the staff app). Status and notes
   are ignored here; a new lead always starts as `new`. */
export class CreateLeadDto extends createZodDto(AdminCreateLeadSchema) {}
export class UpdateLeadDto extends createZodDto(UpdateLeadSchema) {}
export class LogActivityDto extends createZodDto(LogActivitySchema) {}
export class BookLeadDto extends createZodDto(BookLeadSchema) {}
export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}
export class UpdateTaskDto extends createZodDto(UpdateTaskSchema) {}
export class WebsiteTapDto extends createZodDto(WebsiteTapSchema) {}
export class MatchTapDto extends createZodDto(MatchTapSchema) {}
