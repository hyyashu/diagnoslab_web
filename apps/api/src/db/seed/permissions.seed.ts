/**
 * Seed script: populates the permissions and role_permissions tables.
 *
 * Run with:
 *   DATABASE_URL=<your-url> pnpm db:seed
 *
 * This script is idempotent — safe to run multiple times.
 * Existing rows are skipped via onConflictDoNothing().
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { and, eq } from 'drizzle-orm';
import { permissions, rolePermissions } from '../schema';

// All permission strings in the system.
// Convention: 'resource:action' — must match what @Permission() decorators use.
const ALL_PERMISSIONS: { name: string; description: string }[] = [
  // Leads
  { name: 'leads:read', description: 'View leads' },
  { name: 'leads:create', description: 'Create new leads' },
  { name: 'leads:update', description: 'Update existing leads' },
  { name: 'leads:delete', description: 'Delete leads' },
  // Users
  { name: 'users:read', description: 'View users' },
  { name: 'users:create', description: 'Create new users' },
  { name: 'users:update', description: 'Update existing users' },
  { name: 'users:delete', description: 'Delete users' },
  // Doctors
  { name: 'doctors:read', description: 'View doctors' },
  { name: 'doctors:create', description: 'Create doctors' },
  { name: 'doctors:update', description: 'Update doctors' },
  { name: 'doctors:delete', description: 'Delete doctors' },
  // Products
  { name: 'products:read', description: 'View products' },
  { name: 'products:create', description: 'Create products' },
  { name: 'products:update', description: 'Update products' },
  { name: 'products:delete', description: 'Delete products' },
  // Bookings
  { name: 'bookings:read', description: 'View bookings' },
  { name: 'bookings:create', description: 'Create bookings' },
  { name: 'bookings:update', description: 'Update bookings' },
  { name: 'bookings:delete', description: 'Delete bookings' },
  // Meetings
  { name: 'meetings:read', description: 'View meetings' },
  { name: 'meetings:create', description: 'Create meetings' },
  { name: 'meetings:update', description: 'Update meetings' },
  { name: 'meetings:delete', description: 'Delete meetings' },
  // Attendance
  { name: 'attendance:read', description: 'View attendance records' },
  { name: 'attendance:create', description: 'Log attendance' },
  { name: 'attendance:update', description: 'Correct attendance records' },
  { name: 'attendance:delete', description: 'Delete attendance records' },
];

// Default permissions for the ADMIN role.
// Admins can do everything except delete users (destructive — explicit action needed).
const ADMIN_PERMISSIONS = [
  'leads:read',
  'leads:create',
  'leads:update',
  'leads:delete',
  'users:read',
  'users:create',
  'users:update',
  'doctors:read',
  'doctors:create',
  'doctors:update',
  'doctors:delete',
  'products:read',
  'products:create',
  'products:update',
  'products:delete',
  'bookings:read',
  'bookings:create',
  'bookings:update',
  'bookings:delete',
  'meetings:read',
  'meetings:create',
  'meetings:update',
  'meetings:delete',
  'attendance:read',
  'attendance:create',
  'attendance:update',
];

// Default permissions for the USER role (field employee).
// Read-only on most resources; can log and update own attendance.
const USER_PERMISSIONS = [
  'leads:read',
  'doctors:read',
  'products:read',
  'bookings:read',
  'meetings:read',
  'meetings:create',
  'attendance:read',
  'attendance:create',
  'attendance:update',
];

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('Seeding permissions...');

  // Insert all permission definitions — skip duplicates
  await db.insert(permissions).values(ALL_PERMISSIONS).onConflictDoNothing();

  console.log(`Inserted ${ALL_PERMISSIONS.length} permission definitions.`);

  // Build role_permissions rows for ADMIN
  const adminRows = ADMIN_PERMISSIONS.map((name) => ({
    role: 'admin',
    permissionName: name,
    granted: true,
  }));

  // Build role_permissions rows for USER
  const userRows = USER_PERMISSIONS.map((name) => ({
    role: 'user',
    permissionName: name,
    granted: true,
  }));

  await db
    .insert(rolePermissions)
    .values([...adminRows, ...userRows])
    .onConflictDoNothing();

  console.log(
    `Seeded ${adminRows.length} admin permissions and ${userRows.length} user permissions.`,
  );
  console.log('Seeding complete.');

  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
