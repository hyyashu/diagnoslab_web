import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { PermissionsGuard } from './auth/permissions.guard';
import { DrizzleModule } from './db/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './routes/leads/leads.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './routes/users/users.module';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { AuditService } from './common/interceptors/audit.service';
import { pinoConfig } from './routes/logger/pino.config';
import { DoctorsModule } from './routes/doctors/doctors.module';
import { ProductsModule } from './routes/products/products.module';
import { BookingsModule } from './routes/bookings/bookings.module';
import { AttendanceModule } from './routes/attendance/attendance.module';
import { MeetingsModule } from './routes/meetings/meetings.module';
import { EmailModule } from './email/email.module';
import { PushModule } from './push/push.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    LoggerModule.forRoot(pinoConfig),

    EmailModule,
    PushModule,
    AuthModule,
    UsersModule,
    LeadsModule,
    DrizzleModule,
    DoctorsModule,
    ProductsModule,
    BookingsModule,
    AttendanceModule,
    MeetingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuditService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    // Global guards — applied to EVERY route in the application.
    // Order matters: JwtAuthGuard populates request.user, which the subsequent guards read.
    // APP_GUARD (unlike useGlobalGuards) participates in DI, enabling Reflector injection.
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 1st: validate JWT token; respect @Public() routes
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // 2nd: coarse role check via @Roles() — no DB query
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard, // 3rd: fine-grained permission check via @Permission() — reads from token
    },
  ],
})
export class AppModule {}
