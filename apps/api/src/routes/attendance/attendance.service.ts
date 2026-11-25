import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../db/drizzle.service';
import { attendance } from '@diagno/db';
import { eq } from 'drizzle-orm';
import {
  type CreateAttendanceDto,
  type UpdateAttendanceDto,
} from './attendance-dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getAttendance() {
    return this.drizzleService.db.select().from(attendance);
  }

  async createAttendance(createAttendanceDto: CreateAttendanceDto) {
    return this.drizzleService.db
      .insert(attendance)
      .values(createAttendanceDto)
      .returning();
  }

  async updateAttendance(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    return this.drizzleService.db
      .update(attendance)
      .set(updateAttendanceDto)
      .where(eq(attendance.id, id))
      .returning();
  }
}
