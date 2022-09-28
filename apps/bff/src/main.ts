import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BffModule } from './bff.module';

async function bootstrap() {
  const port = process.env.PORT_BFF || 3008;
  const app = await NestFactory.create(BffModule);

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('BFF Challenge')
    .setDescription('The Post API description')
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.debug(`Starting Bff in port: ${port}`);
}
bootstrap();
