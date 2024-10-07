import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAncestors } from "./api-fetch-ancestors";
import "./AncestorsList.css";
import { AncestorsResponse } from "./../../shared/types/types";
import AncestorCard from "./AncestorCard";
import AncestorDeletion from "./ancestors/DeleteAncestor/AncestorDeletion";
import ScrollToTopButton from "./components/Buttons/ScrollToTopButton";

export default function AncestorsList({ id }: { id: number }) {
  const [ancestors, setAncestors] = useState<AncestorsResponse | null>([]); // Utilisation de l'état pour stocker les ancêtres
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/ancestors/${id}`);
  };

  useEffect(() => {
    async function fetchAncestors() {
      try {
        const data = await getAncestors();
        setAncestors(data);
      } catch (error) {
        setError(error as Error);
      }
    }

    fetchAncestors();
  }, []);

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <>
      <div className="container">
        <h1>Liste des ancêtres</h1>
        <div className="cards">
          {ancestors ? (
            ancestors.length > 0 ? (
              ancestors.map((ancestor) => (
                <AncestorCard
                  key={ancestor.id}
                  ancestor={ancestor}
                  onClick={() => handleCardClick(ancestor.id.toString())}
                  className=""
                />
              ))
            ) : (
              <div>Chargement...</div>
            )
          ) : (
            <div>Pas d'ancêtre...</div>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/ancestors/new");
          }}
        >
          Créer un nouvel ancêtre
        </button>
      </div>
      <ScrollToTopButton />
    </>
  );
}
