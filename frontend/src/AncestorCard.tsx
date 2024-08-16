import { useState, useEffect, useRef } from "react";
import { AncestorResponse } from "../src/types/types";
import "./AncestorCard.css";
import "./index.css";

interface AncestorCardProps {
  ancestor: AncestorResponse;
  onClick: () => void;
}

// On définit une variable AncestorCard qui prend en paramètre un objet ancestor et la fonction onClick en prop.
const AncestorCard: React.FC<AncestorCardProps> = ({ ancestor, onClick }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [shouldShowButton, setShouldShowButton] = useState<boolean>(false);
  const occupationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // vérifie la hauteur du contenu pour déterminer si le bouton d'expansion doit apparaître ou non.
    if (occupationRef.current) {
      const { scrollHeight, clientHeight } = occupationRef.current;
      setShouldShowButton(scrollHeight > clientHeight);
    }
  }, []);

  const formatDate = (date: string | Date | null): string => {
    if (date) {
      const dateObject = new Date(date);
      if (!isNaN(dateObject.getTime())) {
        return dateObject.toLocaleDateString();
      }
    }
    return "Date inconnue";
  };

  // on condionne l'affichage au genre de l'ancestor au cas où ancestor.image est null.
  // if/return en ligne possible car une seule instruction.
  const getPlaceholderImage = (gender: string | null): string => {
    if (gender === "male") return "./../placeholderMan.jpg";
    if (gender === "female") return "./../placeholderWoman.webp";
    return "./../placeholderAvatar.png";
  };

  return (
    <div className="card" onClick={onClick}>
      <div>
        <h2>
          {ancestor.firstname} {ancestor.lastname}
        </h2>
        <div>
          <img
            src={
              ancestor.image
                ? ancestor.image
                : getPlaceholderImage(ancestor.gender)
            }
            alt="photo d'ancêtre"
          />
          <p className="styled-fonts" data-label="Sexe :">
            {ancestor.gender === "male"
              ? " Homme"
              : ancestor.gender === "female"
              ? " Femme"
              : " Inconnu"}
          </p>
          <p className="styled-fonts" data-label="Date de naissance :">
            {" "}
            {ancestor.birthdate ? formatDate(ancestor.birthdate) : " - "}
          </p>
          <p className="styled-fonts" data-label="Lieu de naissance :">
            {" "}
            {ancestor.birth_place ? ancestor.birth_place : " - "}
          </p>
          <p className="styled-fonts" data-label="Date de mariage :">
            {ancestor.wedding_date ? formatDate(ancestor.wedding_date) : " - "}
          </p>
          <p className="styled-fonts" data-label="Lieu de mariage :">
            {" "}
            {ancestor.wedding_place ? ancestor.wedding_place : " - "}
          </p>
          <p className="styled-fonts" data-label="Date de décès :">
            {" "}
            {ancestor.death_date ? formatDate(ancestor.death_date) : " - "}
          </p>
          <p className="styled-fonts" data-label="Lieu de décès :">
            {" "}
            {ancestor.death_place ? ancestor.death_place : " - "}
          </p>
          <p
            ref={occupationRef}
            className={`styled-fonts ${isExpanded ? "expanded" : ""}`}
            data-label="Métier :"
          >
            {" "}
            {ancestor.occupation ? ancestor.occupation : " - "}
            {shouldShowButton && (
              <button
                className="read-more-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Empêche le clic de propager à la carte
                  setIsExpanded(!isExpanded);
                }}
                aria-label={isExpanded ? "Réduire" : "En lire plus"}
              >
                {isExpanded ? "▲" : "▼"}
              </button>
            )}
          </p>
          <p className="styled-fonts" data-label="Sosa :">
            {" "}
            {ancestor.sosa ? ancestor.sosa : " - "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AncestorCard;
