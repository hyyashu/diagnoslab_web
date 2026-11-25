import { pgTable, serial, integer, text, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { permissions } from './permissions';

// Per-user permission overrides. When a row exists for (userId, permissionName),
// its 'granted' value wins over the role_permissions default — regardless of role.
// No default on 'granted' — it must be explicitly set to true (allow) or false (deny).
export const userPermissions = pgTable('user_permissions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  permissionName: text('permission_name')
    .notNull()
    .references(() => permissions.name),
  granted: boolean('granted').notNull(), // no default — explicit true/false required
});
