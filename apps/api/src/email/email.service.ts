import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}

export interface SendTelegramOptions {
  message: string;
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(options: SendMailOptions): Promise<void> {
    // await this.mailerService.sendMail({
    //   to: options.to,
    //   subject: options.subject,
    //   text: options.text,
    //   html: options.html,
    // });
    const result = await this.mailerService.sendMail({
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log(' Email Send', result);
  }

  async sendTelegram(options: SendTelegramOptions): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      throw new Error('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set');
    }

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: options.message,
        }),
      },
    );

    const result = await response.json();
    console.log(`TG SEND`, result);
    if (!response.ok || !result.ok) {
      throw new Error(`Telegram Error: ${JSON.stringify(result)}`);
    }
  }
}
