import { Module } from '@nestjs/common';
import { AncestorsService } from './ancestors.service';
import { AncestorsController } from './ancestors.controller';
import { Ancestor } from './ancestor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ancestor])],
  providers: [AncestorsService],
  controllers: [AncestorsController],
  // exports: [AncestorsService, TypeOrmModule.forFeature([Ancestor])],
})
export class AncestorsModule {}

// NB : on peut importer Ancestor sans {} si l'on écrit
// "export default class Ancestor" dans le fichier ancestors.module.ts
// Cf. différence entre exportation nommée (avec {}) et exportation par défaut (sans {}).
