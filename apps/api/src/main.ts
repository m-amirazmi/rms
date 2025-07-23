import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('RMS API')
    .setDescription('The API documentation for Repair Management System RMS')
    .setVersion('1.0.0')
    .addServer(configService.get<string>('HOST') + '/api')
    .build();
  const swaggerDocumentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocumentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  const port = configService.get<number>('PORT') ?? 9900;
  await app.listen(port, () => {
    console.log('Listening at port:', port);
  });
}
bootstrap();
