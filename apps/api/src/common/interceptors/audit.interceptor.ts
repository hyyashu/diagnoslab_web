import {
  Logger,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  SetMetadata,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuditService } from './audit.service';
import { Reflector } from '@nestjs/core';

// Decorator to mark which routes to audit and what entity
export const Audit = (entityType: string) =>
  SetMetadata('audit_entity', entityType);

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly auditService: AuditService,
    private readonly reflector: Reflector,
  ) {}

  private readonly logger = new Logger('Audit');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const entityType = this.reflector.get<string>(
      'audit_entity',
      context.getHandler(),
    );

    if (!entityType) return next.handle(); // skip if no @Audit() decorator

    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const userId = req.user?.id;
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];

    const action =
      {
        POST: 'created',
        PUT: 'updated',
        PATCH: 'updated',
        DELETE: 'deleted',
      }[method] ?? 'accessed';

    return next.handle().pipe(
      tap((responseData) => {
        const entityId = responseData?.id ?? req.params?.id;
        // Never let a failed audit write break the request or crash the API.
        this.auditService
          .log({
            userId,
            action,
            entityType,
            entityId: entityId != null && !Number.isNaN(Number(entityId)) ? String(entityId) : '0',
            newValue: method !== 'DELETE' ? responseData : undefined,
            ipAddress,
            userAgent,
          })
          .catch((e: unknown) => this.logger.error(`Audit log failed: ${e instanceof Error ? e.message : e}`));
      }),
    );
  }
}
