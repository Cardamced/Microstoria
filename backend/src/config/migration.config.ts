import { DataSource } from 'typeorm';
import { databaseConfig } from './database.config';
import { join } from 'path';
import { Ancestor } from './../ancestors/ancestor.entity'; // Assurez-vous que ce chemin est correct

console.log('Import réussi:', Ancestor);
export default new DataSource({
  ...databaseConfig,
  entities: [Ancestor],
  migrations: [join(__dirname, '../migrations/*.ts')],
});

// NB : on recourt au spread operator et à la syntaxe ...databaseConfig
// pour inclure toutes les propriétés de l'objet databaseConfig.
// On ajoute ensuite la propriété migrations pour indiquer à TypeORM où les migrations se trouvent.
// On utilise la syntaxe __dirname pour obtenir le chemin du répertoire actuel.
// On ajoute ensuite le chemin relatif vers le répertoire des migrations.

// NB : on n'oublie surtout pas d'importer l'entité dans le fichier migration.
