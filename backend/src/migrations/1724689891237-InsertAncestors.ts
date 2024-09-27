import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'date-fns';

export class InsertAncestors1634567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/ancestors.json'), 'utf8'),
    );

    const parseDate = (dateString: string): Date | null => {
      if (!dateString) return null;
      if (dateString.startsWith('ABT')) {
        return parse(dateString.replace('ABT ', ''), 'yyyy', new Date());
      } else if (dateString.startsWith('BEF')) {
        return parse(dateString.replace('BEF ', ''), 'yyyy', new Date());
      } else if (dateString.startsWith('AFT')) {
        return parse(dateString.replace('AFT ', ''), 'yyyy', new Date());
      } else {
        return parse(dateString, 'dd MMM yyyy', new Date());
      }
    };

    for (const ancestor of data) {
      await queryRunner.query(
        `INSERT INTO ancestor (id, lastname, firstname, image, birthdate, birth_place, wedding_date, wedding_place, death_date, death_place, gender, sosa, occupation, birthdate_precision, weddingdate_precision, deathdate_precision) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          ancestor.id,
          ancestor.lastname,
          ancestor.firstname,
          ancestor.image,
          parseDate(ancestor.birthdate),
          ancestor.birth_place,
          parseDate(ancestor.wedding_date),
          ancestor.wedding_place,
          parseDate(ancestor.death_date),
          ancestor.death_place,
          ancestor.gender,
          ancestor.sosa,
          ancestor.occupation,
          ancestor.birthdate
            ? ancestor.birthdate.startsWith('ABT')
              ? 'about'
              : ancestor.birthdate.startsWith('BEF')
                ? 'before'
                : null
            : null,
          ancestor.wedding_date
            ? ancestor.wedding_date.startsWith('ABT')
              ? 'about'
              : ancestor.wedding_date.startsWith('BEF')
                ? 'before'
                : null
            : null,
          ancestor.death_date
            ? ancestor.death_date.startsWith('AFT')
              ? 'after'
              : null
            : null,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM ancestor`);
  }
}
