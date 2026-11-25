import { SetMetadata } from '@nestjs/common';

export const MESSAGE_KEY = 'response_message';
export const Message = (msg: string) => SetMetadata(MESSAGE_KEY, msg);
