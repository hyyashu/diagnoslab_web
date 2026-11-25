import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { employees, meetings } from '@diagno/db';
import { DrizzleService } from 'src/db/drizzle.service';
import { and, eq, inArray, type SQL } from 'drizzle-orm';
import { can, type AccessUser } from 'src/auth/access.service';
import type { CreateMeetingDto, UpdateMeetingDto } from './meeting-dto';

/* Doctor visits. Staff without "see everyone's visits" only see and log
   their own (meetings belong to an employee profile linked to a login). */
@Injectable()
export class MeetingsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  private get db() {
    return this.drizzleService.db;
  }

  private async ownEmployeeIds(user: AccessUser) {
    const rows = await this.db.select({ id: employees.id }).from(employees).where(eq(employees.userId, user.id));
    return rows.map((r) => r.id);
  }

  private async scope(user: AccessUser): Promise<SQL | undefined> {
    if (can(user, 'meetings:read:all')) return undefined;
    const ids = await this.ownEmployeeIds(user);
    return ids.length ? inArray(meetings.employeeId, ids) : eq(meetings.id, -1);
  }

  async getMeetings(user: AccessUser) {
    return this.db.select().from(meetings).where(await this.scope(user));
  }

  async getMeeting(id: number, user: AccessUser) {
    const rows = await this.db.select().from(meetings).where(and(eq(meetings.id, id), await this.scope(user)));
    if (!rows.length) throw new NotFoundException('Visit not found');
    return rows;
  }

  async createMeeting(dto: CreateMeetingDto, user: AccessUser) {
    if (!can(user, 'meetings:read:all')) {
      const ids = await this.ownEmployeeIds(user);
      if (!ids.includes(dto.employeeId)) throw new ForbiddenException('You can only log your own visits');
    }
    return this.db.insert(meetings).values(dto).returning();
  }

  async updateMeeting(id: number, dto: UpdateMeetingDto, user: AccessUser) {
    await this.getMeeting(id, user);
    return this.db.update(meetings).set(dto).where(eq(meetings.id, id)).returning();
  }
}
