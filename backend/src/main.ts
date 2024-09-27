import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Dirige les fichiers statiques vers le dossier uploads.
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // paramétrage des CORS pour autoriser les requêtes depuis le frontend.
  app.enableCors({
    origin: 'http://localhost:5173', // Remplacez par l'URL de votre frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  await app.listen(3009);
}
bootstrap();

// NB : la configuration des CORS nécessite au préalable l'installation du package
// @nestjs/platform-express dans le backend.
