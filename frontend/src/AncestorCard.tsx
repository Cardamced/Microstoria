import { AncestorResponse } from "./types/types.ts";

interface AncestorCardProps {
  ancestor: AncestorResponse;
}

// On définit une variable AncestorCard qui prend en paramètre un objet ancestor en prop.
const AncestorCard: React.FC<AncestorCardProps> = ({ ancestor }) => {
  return (
    <div>
      <h2>Vue de l&apos;ancêtre</h2>
      <div>
        {ancestor.firstname} {ancestor.lastname}
        <p>Sexe: {ancestor.gender}</p>
        {/* <p>Date de naissance: {ancestor.birthdate}</p> */}
        <p>Lieu de naissance: {ancestor.birth_place}</p>
        {/* <p>Date de mariage: {ancestor.wedding_date}</p> */}
        <p>Lieu de mariage: {ancestor.wedding_place}</p>
        {/* <p>Date de décès: {ancestor.death_date}</p> */}
        <p>Lieu de décès: {ancestor.death_place}</p>
        <p>Occupation: {ancestor.occupation}</p>
        <p>Sosa: {ancestor.sosa}</p>
      </div>
    </div>
  );
};

export default AncestorCard;
