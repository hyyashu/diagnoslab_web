import { SetMetadata } from '@nestjs/common';

// Key used to store and retrieve the required permission from route metadata
export const PERMISSION_KEY = 'permission';

// Marks a route as requiring a specific permission string.
// Permissions follow the 'resource:action' convention (e.g. 'leads:create', 'users:delete').
// The PermissionsGuard reads this metadata and checks it against request.user.permissions.
//
// Usage: @Permission('leads:create')
export const Permission = (permission: string) =>
  SetMetadata(PERMISSION_KEY, permission);
