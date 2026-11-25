import { SetMetadata } from '@nestjs/common';
import type { Permission as PermissionName } from '@diagno/schemas';

export const PERMISSION_KEY = 'permission';

/* The route needs at least one of these permissions (see @diagno/schemas
   access.ts). The owner always passes. Example: @Permission('leads:read:all', 'leads:read:own') */
export const Permission = (...anyOf: PermissionName[]) => SetMetadata(PERMISSION_KEY, anyOf);
