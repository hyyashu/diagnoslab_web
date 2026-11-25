import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { and, asc, eq, ne, sql } from 'drizzle-orm';
import { userPermissions, users } from '@diagno/db';
import { PERMISSIONS, ROLE_DEFAULTS, ROLES, resolvePermissions, type RoleName } from '@diagno/schemas';
import { DrizzleService } from 'src/db/drizzle.service';
import { AccessService } from 'src/auth/access.service';
import { hashPassword } from '../../auth/password';
import { USER_CREATED } from '../../email/events/email.events';
import { CreateUserDto, SetOverridesDto, UpdateUserDto } from './users-dto';

/* Columns safe to send back: everything except the password hash. */
const publicColumns = {
  id: users.id,
  name: users.name,
  email: users.email,
  role: users.role,
  isActive: users.isActive,
  lastLoginAt: users.lastLoginAt,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

@Injectable()
export class UsersService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly eventEmitter: EventEmitter2,
    private readonly access: AccessService,
  ) {}

  private get db() {
    return this.drizzleService.db;
  }

  /* Everyone, with their exceptions and resulting access. */
  async findAll() {
    const [rows, overrides] = await Promise.all([
      this.db.select(publicColumns).from(users).orderBy(asc(users.name)),
      this.db.select().from(userPermissions),
    ]);
    return rows.map((u) => {
      const mine = overrides.filter((o) => o.userId === u.id);
      return {
        ...u,
        overrides: mine.map((o) => ({ permission: o.permissionName, granted: o.granted })),
        permissions: resolvePermissions(u.role, mine),
      };
    });
  }

  /* Roles, permissions and defaults, for the Roles screen. */
  catalog() {
    return {
      roles: Object.entries(ROLES).map(([id, r]) => ({ id, ...r, permissions: ROLE_DEFAULTS[id as RoleName] })),
      permissions: Object.entries(PERMISSIONS).map(([id, p]) => ({ id, ...p })),
    };
  }

  async create(dto: CreateUserDto) {
    const [exists] = await this.db.select({ id: users.id }).from(users).where(eq(users.email, dto.email)).limit(1);
    if (exists) throw new ConflictException('Someone already uses this email');
    const [created] = await this.db
      .insert(users)
      .values({ name: dto.name, email: dto.email, role: dto.role, password: await hashPassword(dto.password) })
      .returning(publicColumns);
    this.eventEmitter.emit(USER_CREATED, { email: created.email, name: created.name });
    return created;
  }

  /* Changing role, status, password or email signs the person out everywhere. */
  async update(id: number, dto: UpdateUserDto, actorId: number) {
    const current = await this.mustGet(id);
    if (id === actorId && (dto.isActive === false || (dto.role && dto.role !== current.role))) {
      throw new BadRequestException("You can't switch off or change your own role");
    }
    if (current.role === 'superadmin' && (dto.isActive === false || (dto.role && dto.role !== 'superadmin'))) {
      await this.mustKeepAnOwner(id);
    }
    if (dto.email && dto.email !== current.email) {
      const [taken] = await this.db
        .select({ id: users.id })
        .from(users)
        .where(and(eq(users.email, dto.email), ne(users.id, id)))
        .limit(1);
      if (taken) throw new ConflictException('Someone already uses this email');
    }
    const signOut =
      (dto.role && dto.role !== current.role) ||
      (dto.isActive !== undefined && dto.isActive !== current.isActive) ||
      !!dto.password ||
      (dto.email && dto.email !== current.email);

    const [updated] = await this.db
      .update(users)
      .set({
        ...(dto.name && { name: dto.name }),
        ...(dto.email && { email: dto.email }),
        ...(dto.role && { role: dto.role }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.password && { password: await hashPassword(dto.password) }),
        ...(signOut && { sessionVersion: sql`${users.sessionVersion} + 1` }),
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning(publicColumns);
    this.access.forget(id);
    return updated;
  }

  /* Replaces the person's exceptions. Takes effect on their next request. */
  async setOverrides(id: number, dto: SetOverridesDto) {
    const current = await this.mustGet(id);
    if (current.role === 'superadmin') throw new BadRequestException('The owner always has everything');
    const defaults = new Set<string>(ROLE_DEFAULTS[current.role as RoleName] ?? []);
    // Only keep real exceptions: a grant the role lacks, or a removal of one it has.
    const rows = dto.overrides
      .filter((o) => (o.granted ? !defaults.has(o.permission) : defaults.has(o.permission)))
      .map((o) => ({ userId: id, permissionName: o.permission, granted: o.granted }));
    await this.db.transaction(async (tx) => {
      await tx.delete(userPermissions).where(eq(userPermissions.userId, id));
      if (rows.length) await tx.insert(userPermissions).values(rows);
    });
    this.access.forget(id);
    return { overrides: rows.map((r) => ({ permission: r.permissionName, granted: r.granted })) };
  }

  /* Used by login to replace an old plain-text password with its hash. */
  async setPasswordHash(id: number, hash: string) {
    await this.db.update(users).set({ password: hash }).where(eq(users.id, id));
  }

  async findByEmail(email: string) {
    return await this.db.select().from(users).where(eq(users.email, email)).limit(1);
  }

  private async mustGet(id: number) {
    const [u] = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!u) throw new NotFoundException('Staff member not found');
    return u;
  }

  private async mustKeepAnOwner(exceptId: number) {
    const [{ n }] = await this.db
      .select({ n: sql<number>`count(*)::int` })
      .from(users)
      .where(and(eq(users.role, 'superadmin'), eq(users.isActive, true), ne(users.id, exceptId)));
    if (!n) throw new BadRequestException('There must always be at least one active owner');
  }
}
