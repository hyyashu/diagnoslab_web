import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { and, asc, desc, eq, isNull, or, sql, type SQL } from 'drizzle-orm';
import { websiteTaps, leadEvents, leads, contacts, leadFollowups, users } from '@diagno/db';
import type { LeadStatus } from '@diagno/schemas';
import { DrizzleService } from '../../db/drizzle.service';
import { AccessService, can, type AccessUser } from '../../auth/access.service';
import { BookLeadDto, CreateLeadDto, CreateTaskDto, LogActivityDto, UpdateLeadDto, UpdateTaskDto } from './lead-dto';
import { deriveAttribution, deriveInterest, normalizePhone } from './lead-derive';

type Db = DrizzleService['db'];
type Tx = Parameters<Parameters<Db['transaction']>[0]>[0];

/* Statuses a call can move a lead out of automatically. */
const EARLY: LeadStatus[] = ['new', 'no_answer'];

@Injectable()
export class LeadsService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly eventEmitter: EventEmitter2,
    private readonly access: AccessService,
  ) {}

  /* People without "see all leads" only see leads assigned to them. */
  private scope(user: AccessUser): SQL | undefined {
    return can(user, 'leads:read:all') ? undefined : eq(leads.assignedTo, user.id);
  }

  private assertCanSee(user: AccessUser, lead: { assignedTo: number | null }) {
    if (can(user, 'leads:read:all')) return;
    if (lead.assignedTo !== user.id) throw new NotFoundException('Lead not found');
  }

  private get db() {
    return this.drizzleService.db;
  }

  /* Every lead, newest first, with what the list needs: who owns it, how
     many times this person has enquired, and the next open follow-up. */
  async getLeads(user: AccessUser) {
    const enquiries = sql<number>`(select count(*)::int from ${leads} l2 where l2.person_id = ${leads.personId})`;
    const nextTaskAt = sql<Date | null>`(select min(${leadFollowups.dueAt}) from ${leadFollowups} where ${leadFollowups.leadId} = ${leads.id} and ${leadFollowups.doneAt} is null)`;
    return this.db
      .select({
        id: leads.id,
        name: leads.name,
        phone: leads.phone,
        phoneE164: leads.phoneE164,
        email: leads.email,
        message: leads.message,
        status: leads.status,
        lostReason: leads.lostReason,
        assignedTo: leads.assignedTo,
        assigneeName: users.name,
        contactAttempts: leads.contactAttempts,
        lastContactedAt: leads.lastContactedAt,
        interestKind: leads.interestKind,
        interestName: leads.interestName,
        interestPrice: leads.interestPrice,
        bookedAmount: leads.bookedAmount,
        bookedAt: leads.bookedAt,
        channel: leads.channel,
        isPaid: leads.isPaid,
        campaign: leads.campaign,
        source: leads.source,
        notes: leads.notes,
        createdAt: leads.createdAt,
        updatedAt: leads.updatedAt,
        personId: leads.personId,
        enquiries,
        nextTaskAt,
      })
      .from(leads)
      .leftJoin(users, eq(users.id, leads.assignedTo))
      .where(this.scope(user))
      .orderBy(desc(leads.createdAt), desc(leads.id));
  }

  /* One lead with its person, timeline, follow-ups and other enquiries. */
  async getLead(id: number, user: AccessUser) {
    const [lead] = await this.db
      .select({ lead: leads, assigneeName: users.name })
      .from(leads)
      .leftJoin(users, eq(users.id, leads.assignedTo))
      .where(eq(leads.id, id))
      .limit(1);
    if (!lead) throw new NotFoundException('Lead not found');
    this.assertCanSee(user, lead.lead);

    const [person, activities, openTasks, otherLeads, clicks] = await Promise.all([
      lead.lead.personId
        ? this.db.select().from(contacts).where(eq(contacts.id, lead.lead.personId)).then((r) => r[0] ?? null)
        : null,
      this.db
        .select({ activity: leadEvents, userName: users.name })
        .from(leadEvents)
        .leftJoin(users, eq(users.id, leadEvents.userId))
        .where(eq(leadEvents.leadId, id))
        .orderBy(desc(leadEvents.createdAt), desc(leadEvents.id)),
      this.db
        .select({ task: leadFollowups, assigneeName: users.name })
        .from(leadFollowups)
        .leftJoin(users, eq(users.id, leadFollowups.assignedTo))
        .where(eq(leadFollowups.leadId, id))
        .orderBy(asc(leadFollowups.doneAt), asc(leadFollowups.dueAt)),
      lead.lead.personId
        ? this.db
            .select({
              id: leads.id,
              status: leads.status,
              interestName: leads.interestName,
              channel: leads.channel,
              createdAt: leads.createdAt,
            })
            .from(leads)
            .where(and(eq(leads.personId, lead.lead.personId), sql`${leads.id} <> ${id}`, this.scope(user)))
            .orderBy(desc(leads.createdAt))
        : [],
      this.db
        .select({
          id: websiteTaps.id,
          channel: websiteTaps.channel,
          refCode: websiteTaps.refCode,
          clickedAt: websiteTaps.clickedAt,
          page: websiteTaps.page,
          clickIdType: websiteTaps.clickIdType,
        })
        .from(websiteTaps)
        .where(eq(websiteTaps.leadId, id))
        .orderBy(desc(websiteTaps.clickedAt)),
    ]);

    return {
      ...lead.lead,
      assigneeName: lead.assigneeName,
      person,
      activities: activities.map((a) => ({ ...a.activity, userName: a.userName })),
      tasks: openTasks.map((t) => ({ ...t.task, assigneeName: t.assigneeName })),
      otherLeads,
      websiteTaps: clicks,
    };
  }

  /* Website forms and the staff app. Works out phone, person, channel and
     interest, then records the "created" timeline entry. */
  async createLead(dto: CreateLeadDto, userId?: number) {
    const phoneE164 = normalizePhone(dto.phone);
    const attribution = deriveAttribution(dto.source);
    const interest = deriveInterest(dto.source);

    const lead = await this.db.transaction(async (tx) => {
      let personId: number | null = null;
      if (phoneE164) {
        const [person] = await tx
          .insert(contacts)
          .values({ phoneE164, name: dto.name?.trim() || null, email: dto.email || null })
          .onConflictDoUpdate({
            target: contacts.phoneE164,
            set: {
              name: sql`coalesce(excluded.name, ${contacts.name})`,
              email: sql`coalesce(excluded.email, ${contacts.email})`,
              updatedAt: new Date(),
            },
          })
          .returning({ id: contacts.id });
        personId = person.id;
      }

      const [created] = await tx
        .insert(leads)
        .values({
          name: dto.name,
          phone: dto.phone,
          email: dto.email,
          message: dto.message,
          source: dto.source,
          phoneE164,
          personId,
          ...attribution,
          ...interest,
        })
        .returning();

      await tx.insert(leadEvents).values({
        leadId: created.id,
        userId: userId ?? null,
        type: 'created',
        data: { channel: attribution.channel },
      });
      return created;
    });

    this.eventEmitter.emit('lead.created', {
      id: lead.id,
      interestName: lead.interestName,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      source: lead.source,
    });

    return lead;
  }

  /* Status, lost reason, owner or name. Each change goes on the timeline. */
  async updateLead(id: number, dto: UpdateLeadDto, user: AccessUser) {
    const userId = user.id;
    if (dto.assignedTo !== undefined && !can(user, 'leads:assign')) {
      throw new ForbiddenException("You can't assign leads");
    }
    return this.db.transaction(async (tx) => {
      const current = await this.mustGet(tx, id, user);
      const changes: Partial<typeof leads.$inferInsert> = { updatedAt: new Date() };

      if (dto.name !== undefined) changes.name = dto.name;
      if (dto.status && dto.status !== current.status) {
        changes.status = dto.status;
        if (dto.status !== 'lost') changes.lostReason = null;
        await tx.insert(leadEvents).values({
          leadId: id,
          userId,
          type: 'status_change',
          data: { from: current.status, to: dto.status, ...(dto.lostReason && { lostReason: dto.lostReason }) },
        });
      }
      if (dto.lostReason !== undefined && (dto.status ?? current.status) === 'lost') {
        changes.lostReason = dto.lostReason;
      }
      if (dto.assignedTo !== undefined && dto.assignedTo !== current.assignedTo) {
        changes.assignedTo = dto.assignedTo;
        await tx.insert(leadEvents).values({
          leadId: id,
          userId,
          type: 'assigned',
          data: { from: current.assignedTo, to: dto.assignedTo },
        });
      }

      const [updated] = await tx.update(leads).set(changes).where(eq(leads.id, id)).returning();
      return updated;
    });
  }

  /* A call, WhatsApp or note. Calls and WhatsApps count as contact
     attempts, and a call moves a fresh lead along: no answer -> `no_answer`,
     answered -> `contacted`. */
  async logActivity(id: number, dto: LogActivityDto, user: AccessUser) {
    const userId = user.id;
    return this.db.transaction(async (tx) => {
      const current = await this.mustGet(tx, id, user);
      const now = new Date();
      const [activity] = await tx
        .insert(leadEvents)
        .values({ leadId: id, userId, type: dto.type, outcome: dto.outcome, note: dto.note })
        .returning();

      if (dto.type === 'note') {
        await tx.update(leads).set({ updatedAt: now }).where(eq(leads.id, id));
        return activity;
      }

      const changes: Partial<typeof leads.$inferInsert> = {
        contactAttempts: current.contactAttempts + 1,
        lastContactedAt: now,
        firstContactedAt: current.firstContactedAt ?? now,
        updatedAt: now,
      };
      let next: LeadStatus | null = null;
      if (dto.type === 'call' && EARLY.includes(current.status)) {
        if (dto.outcome === 'answered') next = 'contacted';
        else if (dto.outcome !== 'wrong_number') next = 'no_answer';
      }
      if (dto.type === 'whatsapp' && current.status === 'new') next = 'contacted';
      if (next && next !== current.status) {
        changes.status = next;
        await tx.insert(leadEvents).values({
          leadId: id,
          userId,
          type: 'status_change',
          data: { from: current.status, to: next, auto: true },
        });
      }
      await tx.update(leads).set(changes).where(eq(leads.id, id));
      return activity;
    });
  }

  /* Marks the lead booked with what they bought and the total (₹). */
  async book(id: number, dto: BookLeadDto, user: AccessUser) {
    const userId = user.id;
    return this.db.transaction(async (tx) => {
      const current = await this.mustGet(tx, id, user);
      const now = new Date();
      await tx.insert(leadEvents).values({
        leadId: id,
        userId,
        type: 'booked',
        note: dto.note,
        data: { items: dto.items, amount: dto.amount, from: current.status },
      });
      const [updated] = await tx
        .update(leads)
        .set({
          status: 'booked',
          lostReason: null,
          bookedAt: now,
          bookedItems: dto.items,
          bookedAmount: dto.amount,
          updatedAt: now,
        })
        .where(eq(leads.id, id))
        .returning();
      return updated;
    });
  }

  async createTask(leadId: number, dto: CreateTaskDto, user: AccessUser) {
    const userId = user.id;
    return this.db.transaction(async (tx) => {
      await this.mustGet(tx, leadId, user);
      const [task] = await tx
        .insert(leadFollowups)
        .values({
          leadId,
          title: dto.title,
          dueAt: new Date(dto.dueAt),
          assignedTo: dto.assignedTo ?? userId,
          createdBy: userId,
        })
        .returning();
      await tx.insert(leadEvents).values({
        leadId,
        userId,
        type: 'task_created',
        note: dto.title,
        data: { taskId: task.id, dueAt: dto.dueAt },
      });
      return task;
    });
  }

  async updateTask(taskId: number, dto: UpdateTaskDto, user: AccessUser) {
    const userId = user.id;
    return this.db.transaction(async (tx) => {
      const [task] = await tx.select().from(leadFollowups).where(eq(leadFollowups.id, taskId)).limit(1);
      if (!task) throw new NotFoundException('Task not found');
      await this.mustGet(tx, task.leadId, user);
      if (dto.done === !!task.doneAt) return task;
      const [updated] = await tx
        .update(leadFollowups)
        .set({ doneAt: dto.done ? new Date() : null })
        .where(eq(leadFollowups.id, taskId))
        .returning();
      if (dto.done) {
        await tx.insert(leadEvents).values({
          leadId: task.leadId,
          userId,
          type: 'task_done',
          note: task.title,
          data: { taskId },
        });
      }
      return updated;
    });
  }

  /* Open follow-ups across all leads, soonest first: the "to do" list. */
  async openTasks(user: AccessUser) {
    const mine = can(user, 'leads:read:all') ? undefined : or(eq(leads.assignedTo, user.id), eq(leadFollowups.assignedTo, user.id));
    return this.db
      .select({ task: leadFollowups, leadName: leads.name, leadPhone: leads.phone, assigneeName: users.name })
      .from(leadFollowups)
      .innerJoin(leads, eq(leads.id, leadFollowups.leadId))
      .leftJoin(users, eq(users.id, leadFollowups.assignedTo))
      .where(and(isNull(leadFollowups.doneAt), mine))
      .orderBy(asc(leadFollowups.dueAt));
  }

  /* Staff who can own leads, for the "Assigned to" picker. */
  async owners() {
    return this.access.usersWith(['leads:read:all', 'leads:read:own']);
  }

  private async mustGet(tx: Tx, id: number, user: AccessUser) {
    const [lead] = await tx.select().from(leads).where(eq(leads.id, id)).limit(1);
    if (!lead) throw new NotFoundException('Lead not found');
    this.assertCanSee(user, lead);
    return lead;
  }
}
