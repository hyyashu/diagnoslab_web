import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { userPermissions, users } from '@diagno/db';
import { resolvePermissions, type Permission } from '@diagno/schemas';
import { DrizzleService } from '../db/drizzle.service';

export type AccessUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  sessionVersion: number;
  permissions: Permission[];
};

/* A person's current access: role defaults plus their own exceptions,
   read fresh (cached for 30 s, cleared on any change), so a role change or
   a disabled account takes effect on the next request, not at next login. */
@Injectable()
export class AccessService {
  private cache = new Map<number, { at: number; value: AccessUser | null }>();
  private static TTL = 30_000;

  constructor(private readonly drizzle: DrizzleService) {}

  async get(userId: number): Promise<AccessUser | null> {
    const hit = this.cache.get(userId);
    if (hit && Date.now() - hit.at < AccessService.TTL) return hit.value;

    const [u] = await this.drizzle.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        isActive: users.isActive,
        sessionVersion: users.sessionVersion,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    let value: AccessUser | null = null;
    if (u) {
      const overrides = await this.drizzle.db
        .select({ permissionName: userPermissions.permissionName, granted: userPermissions.granted })
        .from(userPermissions)
        .where(eq(userPermissions.userId, userId));
      value = { ...u, permissions: resolvePermissions(u.role, overrides) };
    }
    this.cache.set(userId, { at: Date.now(), value });
    return value;
  }

  forget(userId: number) {
    this.cache.delete(userId);
  }

  /* Staff who hold any of these permissions (for pickers and alerts). */
  async usersWith(anyOf: Permission[]) {
    const all = await this.drizzle.db
      .select({ id: users.id, name: users.name, role: users.role, isActive: users.isActive })
      .from(users);
    const out: { id: number; name: string }[] = [];
    for (const u of all) {
      if (!u.isActive) continue;
      const a = await this.get(u.id);
      if (a && anyOf.some((p) => a.permissions.includes(p))) out.push({ id: u.id, name: u.name });
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  }
}

/* Request user, as JwtStrategy attaches it. */
export type RequestUser = AccessUser;
export const can = (u: { role: string; permissions: string[] } | undefined, p: Permission) =>
  !!u && (u.role === 'superadmin' || u.permissions.includes(p));
