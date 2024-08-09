import react, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAncestorsById } from "./api-fetch-ancestors";
import { AncestorResponse } from "./types/types";
import AncestorCard from "./AncestorCard";
import "./AncestorView.css";
// import AncestorNewForm from "./AncestorNewForm";

export default function AncestorView() {
  const { id } = useParams<{ id: string }>();
  const [ancestor, setAncestor] = useState<AncestorResponse | null>(null); // Utilisation de l'état pour stocker les ancêtres
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/ancestors");
  };

  useEffect(() => {
    console.log("coucou");
    const fetchAncestorById = async () => {
      try {
        const numericId = Number(id); // Convertissez l'ID en nombre
        if (isNaN(numericId)) {
          throw new Error("Invalid ID");
        }
        const data = await getAncestorsById(numericId);
        const transformedData = {
          ...data,
          birthdate: data.birthdate
            ? new Date(data.birthdate).toLocaleDateString()
            : null,
          wedding_date: data.wedding_date
            ? new Date(data.wedding_date).toLocaleDateString()
            : null,
          death_date: data.death_date
            ? new Date(data.death_date).toLocaleDateString()
            : null,
        };
        setAncestor(data);
        console.log("Fetched ancestor", transformedData);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchAncestorById();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // TODO : Créer la page d'affichage d'un ancêtre qui appelera :
  // - AncestorCard
  // - Sources
  // - Events
  return (
    <>
      {/* <div>
        <AncestorNewForm />
      </div> */}
      <div>
        <h1>Vue de l'ancêtre</h1>
        {ancestor ? (
          <div className="cards">
            <AncestorCard ancestor={ancestor} onClick={handleButtonClick} />
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <button onClick={handleButtonClick}>
          <img
            src="./../../backArrow.png"
            alt="Retour vers la liste des ancêtres"
            style={{ height: "40px", width: "40px" }}
          />
        </button>
      </div>
    </>
  );
}
