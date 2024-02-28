import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Vibeefy example')
    .setDescription('The Vibeefy API description')
    .setVersion('1.0')
    .addTag('vibeefy')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(cookieParser());
  app.enableCors({
    origin: ['*', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'UPDATE', 'DELETE'],
    credentials: true,
  });

  SwaggerModule.setup('api', app, document);
  await app.listen(3002);
}
bootstrap();
