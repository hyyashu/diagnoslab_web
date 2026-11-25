import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permissions.decorator';

/* Runs after JwtAuthGuard. Routes without @Permission() only need a login. */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const anyOf = this.reflector.getAllAndOverride<string[]>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!anyOf?.length) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new ForbiddenException('Authentication required');
    if (user.role === 'superadmin') return true;
    if (anyOf.some((p) => user.permissions?.includes(p))) return true;
    throw new ForbiddenException("You don't have access to this");
  }
}
