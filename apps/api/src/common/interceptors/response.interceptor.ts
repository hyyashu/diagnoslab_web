import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MESSAGE_KEY } from '../decorators/message.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message =
      this.reflector.get<string>(MESSAGE_KEY, context.getHandler()) ||
      'Success';

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message,
        data,
      })),
    );
  }
}
