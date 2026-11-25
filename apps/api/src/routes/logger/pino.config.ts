import { Params } from 'nestjs-pino';
import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

export const pinoConfig: Params = {
  pinoHttp: {
    level: isDev ? 'debug' : 'info',
    transport: isDev
      ? { target: 'pino-pretty', options: { colorize: true, singleLine: true } }
      : undefined,

    // In production, write to rotating file
    stream: isDev
      ? undefined
      : pino.transport({
          targets: [
            // Console target
            {
              target: 'pino/file',
              options: { destination: 1 }, // stdout
              level: 'info',
            },
            // Rotating file target
            {
              target: 'pino-roll',
              options: {
                file: './logs/app.log',
                frequency: 'daily', // rotate daily
                size: '50m', // or when file hits 50mb
                mkdir: true, // create logs/ dir if missing
              },
              level: 'info',
            },
            // Separate error file
            {
              target: 'pino-roll',
              options: {
                file: './logs/error.log',
                frequency: 'daily',
                mkdir: true,
              },
              level: 'error',
            },
            // Separate audit file
            {
              target: 'pino-roll',
              options: {
                file: './logs/audit.log',
                frequency: 'daily',
                mkdir: true,
              },
              level: 'info',
            },
          ],
        }),

    // Redact sensitive fields from logs
    redact: {
      paths: [
        'req.headers.authorization',
        'req.body.password',
        'req.body.passwordHash',
      ],
      censor: '[REDACTED]',
    },

    // Custom log serializer
    customLogLevel: (req, res, err) => {
      if (res.statusCode >= 500 || err) return 'error';
      if (res.statusCode >= 400) return 'warn';
      return 'info';
    },
  },
};
