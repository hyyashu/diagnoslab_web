import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permissions.decorator';
import { Role } from './roles.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  // Reflector reads @Permission() metadata set on route handlers
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Read the permission string set by @Permission('resource:action').
    // getAllAndOverride checks method level first, then controller class level.
    const requiredPermission = this.reflector.getAllAndOverride<string>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    // No @Permission() on this route — nothing to enforce here.
    // Route may still be protected by JwtAuthGuard and/or RolesGuard.
    if (!requiredPermission) return true;

    const { user } = context.switchToHttp().getRequest();

    // This guard always runs after JwtAuthGuard, so user should exist for
    // any non-public route. Defensive check in case of misconfiguration.
    if (!user) throw new ForbiddenException('Authentication required');

    // SUPERADMIN role bypasses all permission checks — no array lookup needed.
    // Permissions are not embedded in the SUPERADMIN token (empty array),
    // so we must check role first before checking permissions[].
    if (user.role === Role.SUPERADMIN) return true;

    // Permissions were resolved at login and embedded in the JWT token.
    // JwtStrategy.validate() extracts them into request.user.permissions.
    // This is a simple Array.includes() — zero DB queries per request.
    const hasPermission = (user.permissions as string[])?.includes(
      requiredPermission,
    );

    if (!hasPermission) {
      throw new ForbiddenException('Permission denied');
    }

    return true;
  }
}
