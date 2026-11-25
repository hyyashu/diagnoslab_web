import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { EmailEventsListener } from './email-events.listener';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('SMTP_HOST');
        const port = config.get<number>('SMTP_PORT') ?? 587;
        const user = config.get<string>('SMTP_USER');
        const pass = config.get<string>('SMTP_PASS');
        const secure = config.get<string>('SMTP_SECURE') === 'true';
        const from =
          config.get<string>('MAIL_FROM') ?? '"Diagno" <noreply@diagno.com>';

        const transport: Record<string, unknown> = host
          ? {
              host,
              port,
              secure,
              ...(user && pass ? { auth: { user, pass } } : {}),
            }
          : { jsonTransport: true };

        return {
          transport,
          defaults: { from },
        };
      },
    }),
  ],
  providers: [EmailService, EmailEventsListener],
  exports: [EmailService],
})
export class EmailModule {}
