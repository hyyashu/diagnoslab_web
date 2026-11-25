import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// Defines all possible permission strings in the system.
// Name uses 'resource:action' convention (e.g. 'leads:create', 'users:delete').
// Used as FK target by role_permissions and user_permissions tables.
export const permissions = pgTable('permissions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // e.g. 'leads:create'
  description: text('description'),
});
