import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/exception.filter';
import { ValidationPipe } from '@nestjs/common';

const { ORIGIN, PORTNEST } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Vibeefy user manager')
    .setDescription('The Vibeefy API description')
    .setVersion('1.0')
    .addTag('vibeefy')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );
  app.enableCors({
    origin: ['*', ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'UPDATE', 'DELETE'],
    credentials: true,
  });

  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(PORTNEST);
}
bootstrap();
