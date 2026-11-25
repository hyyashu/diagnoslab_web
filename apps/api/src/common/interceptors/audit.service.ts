import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DrizzleService } from '../../db/drizzle.service';
import { auditLog } from '@diagno/db';

interface AuditPayload {
  userId?: string;
  action: string; // 'created' | 'updated' | 'deleted' | 'status_changed'
  entityType: string; // 'booking' | 'lead' | 'patient'
  entityId: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditService {
  constructor(
    private readonly drizzleService: DrizzleService,
    @InjectPinoLogger(AuditService.name)
    private readonly logger: PinoLogger,
  ) {}

  async log(payload: AuditPayload) {
    await this.drizzleService.db.insert(auditLog).values({
      userId: payload.userId != null ? Number(payload.userId) : undefined,
      action: payload.action,
      entityType: payload.entityType,
      entityId: Number(payload.entityId),
      oldValue: payload.oldValue ?? null,
      newValue: payload.newValue ?? null,
      ipAddress: payload.ipAddress,
      userAgent: payload.userAgent,
    });

    // 2. Write to audit.log file via Pino (typed so ESLint can resolve the call)
    const log = this.logger as { info: (obj: object, msg?: string) => void };
    log.info(
      {
        audit: true, // flag so you can filter in log aggregators
        userId: payload.userId,
        action: payload.action,
        entityType: payload.entityType,
        entityId: payload.entityId,
        oldValue: payload.oldValue,
        newValue: payload.newValue,
        ip: payload.ipAddress,
      },
      `AUDIT: ${payload.action} on ${payload.entityType}:${payload.entityId}`,
    );
  }
}
