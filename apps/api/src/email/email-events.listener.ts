import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  USER_CREATED,
  UserCreatedPayload,
  PASSWORD_RESET_REQUESTED,
  PasswordResetRequestedPayload,
  LeadCreatedPayload,
} from './events/email.events';
import { EmailService } from './email.service';

@Injectable()
export class EmailEventsListener {
  private readonly logger = new Logger(EmailEventsListener.name);

  constructor(private readonly emailService: EmailService) {}

  @OnEvent(USER_CREATED)
  async handleUserCreated(payload: UserCreatedPayload): Promise<void> {
    try {
      const name = payload.name ?? 'there';
      await this.emailService.sendMail({
        to: payload.email,
        subject: 'Welcome to Diagno',
        text: `Hello ${name}, welcome to Diagno.`,
        html: `<p>Hello ${name},</p><p>Welcome to Diagno.</p>`,
      });
    } catch (err) {
      this.logger.error(
        `Failed to send welcome email to ${payload.email}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  @OnEvent(PASSWORD_RESET_REQUESTED)
  async handlePasswordResetRequested(
    payload: PasswordResetRequestedPayload,
  ): Promise<void> {
    try {
      await this.emailService.sendMail({
        to: payload.email,
        subject: 'Password reset',
        text: `Use this token to reset your password: ${payload.resetToken}`,
        html: `<p>Use this token to reset your password: <strong>${payload.resetToken}</strong></p>`,
      });
    } catch (err) {
      this.logger.error(
        `Failed to send password reset email to ${payload.email}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  @OnEvent('lead.created')
  async handleLeadCreated(payload: LeadCreatedPayload) {
    await this.emailService.sendMail({
      to: 'info@diagnoslab.in',
      subject: `New Lead Received - ${payload.name}`,
      html: `
        <h2>New Lead Received</h2>

        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone ?? 'N/A'}</p>

        <h3>Message</h3>
        <p>${payload.message ?? 'No message provided'}</p>
      `,
    });

    const sourceText = Object.entries(payload.source || {})
      .map(([key, value]) => `• ${key}: ${value}`)
      .join('\n');

    await this.emailService.sendTelegram({
      message: `
 🔥 NEW LEAD
👤 ${payload.name}
📧 ${payload.email}
📞 ${payload.phone ?? 'N/A'}
📊 Source
${sourceText}
💬 ${payload.message ?? 'No message provided'}`,
    });
  }
}
