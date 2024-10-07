// update-ancestor.dto.ts
export class UpdateAncestorDto {
  readonly id!: number;
  readonly lastname?: string;
  readonly firstname?: string;
  readonly image?: string;
  readonly gender?: string;
  readonly birthdate?: Date;
  readonly birth_place?: string;
  readonly wedding_date?: Date;
  readonly wedding_place?: string;
  readonly death_date?: Date;
  readonly death_place?: string;
  readonly occupation?: string;
  readonly birthdate_precision?: string;
  readonly weddingdate_precision?: string;
  readonly deathdate_precision?: string;
}
// NB : penser à refactoriser les Dto pour plus de maintenabilité.
// Cf.Notes projet: héritage de classe dans Typescript.
