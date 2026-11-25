import { z } from 'zod';

/* Who can do what. One list, used by the API (checks) and the apps
   (hiding menus and buttons). Role defaults live here, in code, so they are
   reviewed like code; the database only stores per-person exceptions
   (user_permissions). The owner (superadmin) always has everything. */

export const PERMISSIONS = {
  // Leads
  'leads:read:all': { group: 'Leads', label: 'See all leads' },
  'leads:read:own': { group: 'Leads', label: 'See leads assigned to them' },
  'leads:work': { group: 'Leads', label: 'Work leads: call, note, follow-up, status, book' },
  'leads:assign': { group: 'Leads', label: 'Assign leads to staff' },
  'leads:revenue': { group: 'Leads', label: 'See revenue totals (₹)' },
  'leads:create': { group: 'Leads', label: 'Add leads by hand' },
  // Attendance and leave
  'attendance:self': { group: 'Attendance', label: 'Check in and out, see own attendance' },
  'attendance:read:all': { group: 'Attendance', label: "See everyone's attendance" },
  'attendance:edit': { group: 'Attendance', label: 'Correct attendance records' },
  'leave:apply': { group: 'Attendance', label: 'Apply for leave' },
  'leave:approve': { group: 'Attendance', label: 'Approve or reject leave' },
  // Field work
  'meetings:read:all': { group: 'Field work', label: "See everyone's doctor visits" },
  'meetings:read:own': { group: 'Field work', label: 'See own doctor visits' },
  'meetings:write': { group: 'Field work', label: 'Log and edit doctor visits' },
  'doctors:read': { group: 'Field work', label: 'See the doctors list' },
  'doctors:write': { group: 'Field work', label: 'Add and edit doctors' },
  // Admin
  'reports:export': { group: 'Admin', label: 'Export reports (CSV)' },
  'users:manage': { group: 'Admin', label: 'Add staff, change roles and access' },
  'hr:salary': { group: 'Admin', label: 'See salary and HR details' },
  'settings:manage': { group: 'Admin', label: 'Change settings and integrations' },
} as const;

export type Permission = keyof typeof PERMISSIONS;
export const permissionNames = Object.keys(PERMISSIONS) as Permission[];
export const PermissionEnum = z.enum(permissionNames as [Permission, ...Permission[]]);

/* `superadmin` is shown as "Owner"; the value is kept for old tokens and data. */
export const ROLES = {
  superadmin: { label: 'Owner', description: 'Everything, including staff accounts, settings and money.' },
  manager: { label: 'Manager', description: 'Runs the day: all leads, attendance, approvals and reports.' },
  front_desk: { label: 'Front desk', description: 'Reception and calling: works leads, books tests.' },
  field: { label: 'Field staff', description: 'Home collection and doctor visits: own leads and visits.' },
  lab: { label: 'Lab staff', description: 'Technicians and radiology: attendance and leave.' },
} as const;

export type RoleName = keyof typeof ROLES;
export const roleNames = Object.keys(ROLES) as RoleName[];
export const RoleEnum = z.enum(roleNames as [RoleName, ...RoleName[]]);

const SELF: Permission[] = ['attendance:self', 'leave:apply'];

export const ROLE_DEFAULTS: Record<RoleName, Permission[]> = {
  superadmin: permissionNames,
  manager: [
    'leads:read:all', 'leads:read:own', 'leads:work', 'leads:assign', 'leads:revenue', 'leads:create',
    ...SELF, 'attendance:read:all', 'attendance:edit', 'leave:approve',
    'meetings:read:all', 'meetings:read:own', 'meetings:write', 'doctors:read', 'doctors:write',
    'reports:export',
  ],
  front_desk: ['leads:read:all', 'leads:read:own', 'leads:work', 'leads:create', ...SELF, 'doctors:read'],
  field: ['leads:read:own', 'leads:work', ...SELF, 'meetings:read:own', 'meetings:write', 'doctors:read'],
  lab: [...SELF],
};

/* Role defaults, then the person's own grants and removals. */
export function resolvePermissions(
  role: string,
  overrides: { permissionName: string; granted: boolean }[] = [],
): Permission[] {
  if (role === 'superadmin') return [...permissionNames];
  const set = new Set<string>(ROLE_DEFAULTS[role as RoleName] ?? []);
  for (const o of overrides) {
    if (!(o.permissionName in PERMISSIONS)) continue;
    if (o.granted) set.add(o.permissionName);
    else set.delete(o.permissionName);
  }
  return permissionNames.filter((p) => set.has(p));
}

/* Staff accounts, managed by the owner (users:manage). */
export const CreateStaffSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8, 'At least 8 characters').max(200),
  role: RoleEnum,
});
export type CreateStaffInput = z.infer<typeof CreateStaffSchema>;

export const UpdateStaffSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  email: z.email().trim().toLowerCase().optional(),
  role: RoleEnum.optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8, 'At least 8 characters').max(200).optional(),
});
export type UpdateStaffInput = z.infer<typeof UpdateStaffSchema>;

/* The person's full list of exceptions; anything not listed follows the role. */
export const SetOverridesSchema = z.object({
  overrides: z.array(z.object({ permission: PermissionEnum, granted: z.boolean() })).max(100),
});
export type SetOverridesInput = z.infer<typeof SetOverridesSchema>;
