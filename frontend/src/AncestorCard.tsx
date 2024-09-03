import { useState, useEffect, useRef } from "react";
import { AncestorResponse } from "./../../shared/types/types";
import "./AncestorCard.css";
import "./index.css";

interface AncestorCardProps {
  ancestor: AncestorResponse;
  onClick: () => void;
  className: string;
}

// On définit une variable AncestorCard qui prend en paramètre un objet ancestor et la fonction onClick en prop.
const ancestorCard: React.FC<AncestorCardProps> = ({ ancestor, onClick }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [shouldShowButton, setShouldShowButton] = useState<boolean>(false);
  const occupationRef = useRef<HTMLDivElement>(null);
  const letterMonth = [
    "jan",
    "fev",
    "mar",
    "avr",
    "mai",
    "juin",
    "juil",
    "aou",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  useEffect(() => {
    // vérifie la hauteur du contenu pour déterminer si le bouton d'expansion doit apparaître ou non.
    if (occupationRef.current) {
      const { scrollHeight, clientHeight } = occupationRef.current;
      setShouldShowButton(scrollHeight > clientHeight);
    }
  }, []);

  const formatDate = (dateString: string | Date | null): string => {
    if (dateString === null) {
      return "Date inconnue";
    }
  
    const date = new Date(dateString);
    const day = date.getDate();
    const month = letterMonth[date.getMonth()]; // Utilise letterMonth pour obtenir le mois en lettres
    const year = date.getFullYear();
  
    // Formatage de la date en "DD MMM YYYY"
    return `${day.toString().padStart(2, "0")} ${month} ${year}`;
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
      <div className="card-header">
        {ancestor.gender === "male" ? (
          <img src="./manSym.png" alt="Homme" className="gender-symbol" />
        ) : ancestor.gender === "female" ? (
          <img src="./womSym.png" alt="Homme" className="gender-symbol" />
        ) : (
          ""
        )}
        <h2>
          {ancestor.firstname} {ancestor.lastname}
        </h2>
        <div className="portrait">
          <img
            src={
              ancestor.image
                ? ancestor.image
                : getPlaceholderImage(ancestor.gender || null)
            }
            alt="Portrait d'ancêtre"
          />
        </div>
        <p className="styled-fonts" data-label="Naissance"></p>
        <p className="styled-fonts">
          {ancestor.birthdate ? "le " + formatDate(ancestor.birthdate) : " - "}{" "}
          {ancestor.birth_place ? " à " + ancestor.birth_place : " - "}
        </p>
        <p className="styled-fonts" data-label="Mariage"></p>
        <p className="styled-fonts">
          {ancestor.wedding_date
            ? "le " + formatDate(ancestor.wedding_date)
            : " - "}{" "}
          {ancestor.wedding_place ? " à " + ancestor.wedding_place : " - "}
        </p>
        <p className="styled-fonts" data-label="Décès"></p>
        <p className="styled-fonts">
          {ancestor.death_date
            ? "le " + formatDate(ancestor.death_date)
            : " - "}
          {ancestor.death_place ? " à " + ancestor.death_place : " - "}
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
        {/* TODO : Ajouter le numéro de Sosa automatiquement en fonction du champ renseigné par la personne qui sera le sosa 1.
          Prévoir le calcul s'il n'est pas déjà dans le script python ; intégrer champ */}
        {/* <p className="styled-fonts" data-label="Sosa :">
            {" "}
            {ancestor.sosa ? ancestor.sosa : " - "}
          </p> */}
      </div>
    </div>
  );
};

export default ancestorCard;
