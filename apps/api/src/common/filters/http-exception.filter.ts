import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  success: false;
  message: string | string[];
  errors?: unknown;
  data: null;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    /** 1️⃣ Invalid JSON body */
    if (this.isInvalidJsonError(exception)) {
      return this.reply(
        res,
        HttpStatus.BAD_REQUEST,
        'Invalid JSON format in request body',
      );
    }

    /** 2️⃣ HttpException (includes Zod validation via global ZodValidationPipe) */
    if (exception instanceof HttpException) {
      const { status, message, errors } = this.extractHttpError(exception);
      this.log(req, exception, status);
      return this.reply(res, status, message, errors);
    }

    /** 3️⃣ Unknown server error */
    this.log(req, exception, HttpStatus.INTERNAL_SERVER_ERROR);
    return this.reply(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error',
    );
  }

  // ---------- helpers ----------

  private isInvalidJsonError(exception: unknown): boolean {
    return (
      exception instanceof SyntaxError ||
      (exception instanceof Error &&
        exception.message.includes('JSON') &&
        (exception.message.includes('position') ||
          exception.message.includes('Unexpected')))
    );
  }

  private extractHttpError(exception: HttpException): {
    status: number;
    message: string | string[];
    errors?: unknown;
  } {
    const status = exception.getStatus();
    const response = exception.getResponse();

    if (typeof response === 'string') {
      return { status, message: response };
    }

    if (typeof response === 'object' && response) {
      const r = response as {
        message?: string | string[];
        error?: string;
        errors?: unknown; // ⭐ Zod support
      };

      return {
        status,
        message: r.message ?? r.error ?? 'Request failed',
        errors: r.errors,
      };
    }

    return { status, message: 'Request failed' };
  }

  private reply(
    res: Response,
    status: number,
    message: string | string[],
    errors?: unknown,
  ) {
    const body: ErrorResponse = {
      success: false,
      message,
      data: null,
      ...(errors ? { errors } : {}),
    };

    return res.status(status).json(body);
  }

  private log(req: Request, exception: unknown, status: number) {
    if (process.env.NODE_ENV === 'production') return;

    this.logger.error(
      `${req.method} ${req.url} → ${status}`,
      exception instanceof Error ? exception.stack : String(exception),
    );
  }
}
