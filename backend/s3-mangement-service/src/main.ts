import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { EnvConfigService } from './utils/env.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvConfigService);

  const { port, origin } = configService.getPort();

  const config = new DocumentBuilder()
    .setTitle('Vibeefy S3')
    .setDescription('The Vibeefy API description')
    .setVersion('1.0')
    .addTag('vibeefy')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['*', origin],
    methods: ['GET', 'POST', 'PUT', 'UPDATE', 'DELETE'],
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(port);
}

bootstrap();
