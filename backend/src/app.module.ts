import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AncestorsModule } from './ancestors/ancestors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AncestorsModule,
    MulterModule.register({
      dest: './uploads', // Définir le répertoire de destination
    }),
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
