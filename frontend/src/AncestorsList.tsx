import { useState, useEffect } from "react";
import { getAncestors } from "./api-fetch-ancestors";
import "./AncestorsList.css";
import { AncestorsResponse } from "./types/types.ts";
import AncestorCard from "./AncestorCard";

export default function AncestorsList() {
  const [ancestors, setAncestors] = useState<AncestorsResponse | null>([]); // Utilisation de l'état pour stocker les ancêtres
  const [error, setError] = useState<Error | null>(null);

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
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="coucou">
        <h1>Liste des ancêtres</h1>
        <div className="cards">
          {ancestors ? (
            ancestors.length > 0 ? (
              ancestors.map((ancestor) => (
                <AncestorCard key={ancestor.id} ancestor={ancestor} />
              ))
            ) : (
              <div>Loading...</div>
            )
          ) : (
            <div>Pas d'ancêtre...</div>
          )}
        </div>
      </div>
    </>
  );
}
