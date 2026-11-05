import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import * as bodyParser from 'body-parser' 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para React Native
  app.enableCors();

  // ✅ Aumentar límite del body parser (soluciona error 413)
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
