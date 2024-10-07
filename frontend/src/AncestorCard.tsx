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
  console.log("ancestor data:", ancestor);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [shouldShowButton, setShouldShowButton] = useState<boolean>(false);
  const occupationRef = useRef<HTMLDivElement>(null);
  const letterMonth = [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juill.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
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
        <h2>
          <div className="folded-corner-top-left"></div>
          {ancestor.gender === "male" ? (
            <img src="./manSym.svg" alt="Homme" className="gender-symbol" />
          ) : ancestor.gender === "female" ? (
            <img src="./womSym.svg" alt="femme" className="gender-symbol" />
          ) : (
            ""
          )}
          {ancestor.firstname} {ancestor.lastname}
        </h2>
        <div className="portrait-frame">
          <div className="portrait-container">
            <img
              src={
                ancestor.image
                  ? ancestor.image
                  : getPlaceholderImage(ancestor.gender || null)
              }
              alt="Portrait d'ancêtre"
              className="portrait"
            />
          </div>
        </div>
        <p className="styled-fonts" data-label="Naissance"></p>
        <p className="styled-fonts-data">
          {ancestor.birthdate ? "le " + formatDate(ancestor.birthdate) : " - "}{" "}
          {ancestor.birth_place ? " à " + ancestor.birth_place : " - "}
        </p>
        <p className="styled-fonts" data-label="Mariage"></p>
        <p className="styled-fonts-data">
          {ancestor.wedding_date
            ? "le " + formatDate(ancestor.wedding_date)
            : " - "}{" "}
          {ancestor.wedding_place ? " à " + ancestor.wedding_place : " - "}
        </p>
        <p className="styled-fonts" data-label="Décès"></p>
        <p className="styled-fonts-data">
          {ancestor.death_date
            ? "le " + formatDate(ancestor.death_date)
            : " - "}
          {ancestor.death_place ? " à " + ancestor.death_place : " - "}
        </p>
        {/* <p className="styled-fonts" data-label="métier"></p> */}
        {/* <p className="styled-fonts-data">
          {ancestor.occupation ? ancestor.occupation : " - "}
        </p> */}
        {/*TODO : travailler la possibilité de créer un dropdown pour gérer du texte qui déborderait
        au cas où il y aurait beaucoup d'informations.
        Idem : prévoir Textarea avec éléments saillants de la biographie.*/}
        <p
          ref={occupationRef}
          className={`styled-fonts ${isExpanded ? "expanded" : ""}`}
          data-label="Métier"
        >
          <p className="styled-fonts-data">{ancestor.occupation ? ancestor.occupation : " - "}</p>
          {/* {shouldShowButton && (
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
          )} */}
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
