import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Reflector reads decorator metadata set on handlers and controllers
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // getAllAndOverride checks method first, then controller class.
    // Method-level @Public() takes priority over class-level settings.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Short-circuit: skip Passport JWT validation entirely for public routes.
    // request.user will be undefined on public routes — this is intentional.
    if (isPublic) return true;

    // Delegate to Passport's JWT strategy to verify token signature and expiry
    return super.canActivate(context);
  }
}
