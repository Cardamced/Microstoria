import { AncestorResponse } from "./types/types.ts";
import "./AncestorCard.css";

interface AncestorCardProps {
  ancestor: AncestorResponse;
}

// On définit une variable AncestorCard qui prend en paramètre un objet ancestor en prop.
const AncestorCard: React.FC<AncestorCardProps> = ({ ancestor }) => {
  const placeholderImage: string = "./public/Placeholder-Man.jpg";
  return (
    <div className="card">
      <div>
        {ancestor.firstname} {ancestor.lastname}
        <img src={placeholderImage} alt="photo d'ancêtre" />
        <p>Sexe: {ancestor.gender}</p>
        {/* TODO : intégrer une {ancestor.image} */}
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
