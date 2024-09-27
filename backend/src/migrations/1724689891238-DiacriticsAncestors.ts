import { MigrationInterface, QueryRunner } from 'typeorm';

export class DataDiacritics1623456789012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Exemple de mise à jour de la table ancestors pour gérer les diacritiques
    await queryRunner.query(`
      ALTER TABLE ancestor
      MODIFY firstname VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
      MODIFY lastname VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // Exemple de mise à jour de la table ancestors pour gérer les dates
    await queryRunner.query(`
      ALTER TABLE ancestor
      MODIFY birthdate DATE,
      MODIFY wedding_date DATE,
      MODIFY death_date DATE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revenir aux modifications précédentes si nécessaire
    await queryRunner.query(`
      ALTER TABLE ancestor
      MODIFY firstname VARCHAR(255),
      MODIFY lastname VARCHAR(255)
    `);

    await queryRunner.query(`
      ALTER TABLE ancestor
      MODIFY birthdate DATETIME,
      MODIFY wedding_date DATETIME,
      MODIFY death_date DATETIME
    `);
  }
}
