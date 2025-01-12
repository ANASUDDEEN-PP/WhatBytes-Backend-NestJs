import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe to automatically validate DTOs and entities
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Automatically removes properties that are not in the DTO
    forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are passed
    transform: true,            // Automatically transforms payloads to DTO instances
  }));

  // Enabling CORS for cross-origin requests (optional, depends on your needs)
  app.enableCors();

  // Setting the global prefix for the API (optional)
  app.setGlobalPrefix('api');

  // Start the server
  await app.listen(3000, () => {
    console.log('Application is running on: http://localhost:3000');
  });
}

bootstrap();
