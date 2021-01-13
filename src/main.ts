import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Cognizant Challenge')
    .setDescription('An API Crafted for the cognizant challenge')
    .setVersion('1.0')
    .setContact(
      'Matheus Vargem',
      'https://github.com/busycore',
      'matheusvrgm@gmail.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
