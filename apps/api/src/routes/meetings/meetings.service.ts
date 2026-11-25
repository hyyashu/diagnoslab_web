import { Injectable } from '@nestjs/common';
import { meetings } from '@diagno/db';
import { DrizzleService } from 'src/db/drizzle.service';
import { eq } from 'drizzle-orm';
import type { CreateMeetingDto, UpdateMeetingDto } from './meeting-dto';

@Injectable()
export class MeetingsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getMeetings() {
    return await this.drizzleService.db.select().from(meetings);
  }
  async getMeeting(id: number) {
    return await this.drizzleService.db
      .select()
      .from(meetings)
      .where(eq(meetings.id, id));
  }
  async createMeeting(createMeetingDto: CreateMeetingDto) {
    return await this.drizzleService.db
      .insert(meetings)
      .values(createMeetingDto);
  }
  async updateMeeting(id: number, updateMeetingDto: UpdateMeetingDto) {
    return await this.drizzleService.db
      .update(meetings)
      .set(updateMeetingDto)
      .where(eq(meetings.id, id));
  }
}
