import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { createZodDto } from 'nestjs-zod';
import { PushSubscribeSchema, PushUnsubscribeSchema } from '@diagno/schemas';
import { Message } from '../common/decorators/message.decorator';
import { PushService } from './push.service';
import { User } from '../auth/user.decorator';

class SubscribeDto extends createZodDto(PushSubscribeSchema) {}
class UnsubscribeDto extends createZodDto(PushUnsubscribeSchema) {}

/* Signed-in staff only (the global JWT guard applies). */
@Controller('push')
export class PushController {
  constructor(private readonly push: PushService) {}

  @Get('public-key')
  @Message('Push key')
  publicKey() {
    return this.push.publicKey();
  }

  @Post('subscribe')
  @Message('Notifications on')
  subscribe(@Body() dto: SubscribeDto, @User('id') userId: number, @Headers('user-agent') ua?: string) {
    return this.push.subscribe(dto.endpoint, dto.keys, userId, ua?.slice(0, 300));
  }

  @Post('unsubscribe')
  @Message('Notifications off')
  unsubscribe(@Body() dto: UnsubscribeDto) {
    return this.push.unsubscribe(dto.endpoint);
  }

  @Post('test')
  @Message('Test sent')
  test(@User('id') userId: number) {
    return this.push.sendTo([userId], { title: 'Diagnos Lab', body: 'Notifications are working.', url: '/leads', tag: 'test' });
  }
}
