import { DataSourceOptions } from 'typeorm';
import { join } from 'path'; // Add this line to import the 'join' function from the 'path' module
import 'dotenv/config';
import { Ancestor } from './../ancestors/ancestor.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [Ancestor, join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  subscribers: [join(__dirname, '../subscribers/*{.ts,.js}')],
  synchronize: false,
};

// import de la méthode join pour résoudre l'erreur typescript d'importation hors d'un module.

// La fonction join du module path est utilisée pour créer
// des chemins de fichiers compatibles avec le système d'exploitation.
// Utilisation de join pour les entities : La méthode join est utilisée
// pour construire le chemin des entités, ce qui permet de s'assurer que
// le chemin est correct quel que soit le système d'exploitation.
