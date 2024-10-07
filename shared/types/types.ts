import { Gender } from "../../backend/src/ancestors/ancestor.entity";

export interface Ancestor {
    id: number;
    lastname?: string | null;
    firstname?: string | null;
    image?: string | null;
    birthdate?: Date | null;
    birth_place?: string | null;
    wedding_date?: Date | null;
    wedding_place?: string | null;
    death_date?: Date | null;
    death_place?: string | null;
    gender?: Gender;
    sosa?: number | null;
    occupation?: string | null;
    birthdate_precision?: Date | null;
    weddingdate_precision?: Date | null;
    deathdate_precision?: Date | null;
}

export type AncestorsResponse = Ancestor[];
export type AncestorResponse = Ancestor;