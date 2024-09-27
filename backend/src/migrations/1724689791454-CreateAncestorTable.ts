import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAncestorTable1722974261329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //vérification préalable de l'existence de la table
    const tableExists = await queryRunner.hasTable('ancestor');

    if (!tableExists) {
      await queryRunner.query(`
            CREATE TABLE \`ancestor\` (
              \`id\` int NOT NULL AUTO_INCREMENT,
              \`lastname\` varchar(255) NULL,
              \`firstname\` varchar(255) NULL,
              \`image\` varchar(512) NULL,
              \`birthdate\` datetime NULL,
              \`birth_place\` varchar(255) NULL,
              \`wedding_date\` datetime NULL,
              \`wedding_place\` varchar(255) NULL,
              \`death_date\` datetime NULL,
              \`death_place\` varchar(255) NULL,
              \`gender\` enum ('male', 'female', 'unknown') NULL DEFAULT 'unknown',
              \`sosa\` int NULL,
              \`occupation\` varchar(80) NULL,
              \`birthdate_precision\` varchar(10) NULL,
              \`weddingdate_precision\` varchar(10) NULL,
              \`deathdate_precision\` varchar(10) NULL,
              PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB;
          `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`ancestor\`;`);
  }
}
