import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: [
      'https://diagnoslab.in',
      'https://www.diagnoslab.in',
      process.env.ADMIN_FRONTEND_URL,
      process.env.USER_FRONTEND_URL,
    ],
    credentials: true,
  });

  /* API docs list every route, so they are only served outside production. */
  const showDocs = process.env.NODE_ENV !== 'production';
  if (showDocs) {
    const config = new DocumentBuilder()
      .setTitle('Diagno API')
      .setDescription('Diagno backend REST API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, cleanupOpenApiDoc(document));
  }

  app.useGlobalFilters(new HttpExceptionFilter());
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  logger.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  if (showDocs) {
    logger.log(
      `Swagger docs: http://localhost:${process.env.PORT ?? 3000}/api/docs`,
    );
  }
  logger.log(`User Frontend URL: ${process.env.USER_FRONTEND_URL}`);
  logger.log(`Admin Frontend URL: ${process.env.ADMIN_FRONTEND_URL}`);
}
bootstrap();
