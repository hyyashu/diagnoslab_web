import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';
import { permissions } from './permissions';

// Maps roles to their default permissions.
// 'role' is plain text (not an FK) — SUPERADMIN bypass is purely code-level,
// so no row for 'superadmin' is needed here.
// granted=false rows allow explicit deny at the role level.
export const rolePermissions = pgTable('role_permissions', {
  id: serial('id').primaryKey(),
  role: text('role').notNull(), // e.g. 'admin', 'user'
  permissionName: text('permission_name')
    .notNull()
    .references(() => permissions.name),
  granted: boolean('granted').notNull().default(true),
});
