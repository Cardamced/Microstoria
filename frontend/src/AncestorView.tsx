import react, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAncestorsById } from "./api-fetch-ancestors";
import { AncestorResponse } from "./types/types";
import AncestorCard from "./AncestorCard";
import "./AncestorView.css";
import AncestorDeletion from "./ancestors/DeleteAncestor/AncestorDeletion";

export default function AncestorView({ ancestorId }: { ancestorId: number }) {
  const { id } = useParams<{ id: string }>();
  const [ancestor, setAncestor] = useState<AncestorResponse | null>(null); // Utilisation de l'état pour stocker les ancêtres
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/ancestors");
  };

  useEffect(() => {
    const fetchAncestorById = async () => {
      try {
        const numericId = Number(id); // Convertissez l'ID en nombre
        if (isNaN(numericId)) {
          throw new Error("Invalid ID");
        }
        const data = await getAncestorsById(numericId);
        setAncestor(data);
        console.log("Fetched ancestor", data);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchAncestorById();
  }, [id]);

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  // TODO : Créer la page d'affichage d'un ancêtre qui appelera :
  // - AncestorCard
  // - Sources
  // - Events
  return (
    <>
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
      {ancestor && <AncestorDeletion ancestorId={Number(id)} />}
    </>
  );
}
