import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Unknown = 'unknown',
}

@Entity()
export class Ancestor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastname?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstname?: string | null;

  @Column({ type: 'varchar', length: 512, nullable: true })
  image?: string | null;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  birth_place?: string | null;

  @Column({ type: 'date', nullable: true })
  wedding_date?: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  wedding_place?: string | null;

  @Column({ type: 'date', nullable: true })
  death_date?: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  death_place?: string | null;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Unknown,
    nullable: true,
  })
  gender?: Gender;

  @Column({ type: 'int', nullable: true })
  sosa?: number;

  @Column({ type: 'varchar', length: 80, nullable: true })
  occupation?: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  birthdate_precision?: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  weddingdate_precision?: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  deathdate_precision?: string | null;

  // TODO: Voir si les données des propriétés ci-après sont pertinentes
  // ou si ce sont des jointures à prévoir.

  //   @Column({ nullable: true })
  //   description: string;

  //   @Column({ nullable: true })
  //   father_id: number;

  //   @Column({ nullable: true })
  //   mother_id: number;
}
