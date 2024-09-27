// create-ancestor.dto.ts
import { IsString, IsOptional, IsDate, IsEnum } from 'class-validator';
import { Gender } from '../ancestor.entity';

export class CreateAncestorDto {
  @IsOptional()
  @IsString()
  readonly lastname?: string;

  @IsOptional()
  @IsString()
  readonly firstname?: string;

  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsOptional()
  @IsDate()
  readonly birthdate?: Date;

  @IsOptional()
  @IsString()
  readonly birth_place?: string;

  @IsOptional()
  @IsDate()
  readonly wedding_date?: Date;

  @IsOptional()
  @IsString()
  readonly wedding_place?: string;

  @IsOptional()
  @IsDate()
  readonly death_date?: Date;

  @IsOptional()
  @IsString()
  readonly death_place?: string;

  @IsEnum(Gender)
  readonly gender?: Gender;

  @IsOptional()
  @IsString()
  readonly sosa?: string;

  @IsOptional()
  @IsString()
  readonly occupation?: string;

  @IsOptional()
  @IsString()
  readonly birthdate_precision?: string;

  @IsOptional()
  @IsString()
  readonly weddingdate_precision?: string;

  @IsOptional()
  @IsString()
  readonly deathdate_precision?: string;
}
