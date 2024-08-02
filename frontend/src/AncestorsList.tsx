import { useState, useEffect } from "react";
import { getAncestors } from "./api-fetch-ancestors";
import "./AncestorsList.css";
import { Gender } from "../../backend/src/ancestors/ancestor.entity";
import { Ancestor, AncestorsResponse } from "./types/types.ts"

export default function AncestorsList() {
  const [ancestors, setAncestors] = useState<AncestorsResponse | null>([]); // Utilisation de l'état pour stocker les ancêtres
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAncestors() {
      try {
        const data: AncestorsResponse = await getAncestors();
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
      <div>
        <h2>Liste des ancêtres</h2>
        <ul>
          {ancestors && ancestors.length > 0 ? (
            ancestors.map((ancestor) => (
              <li key={ancestor.id}>
                {ancestor.firstname} {ancestor.lastname}
                <p>Sexe: {ancestor.gender}</p>
                <p>Date de naissance: {ancestor?.birthdate}</p>
              </li>
            ))
          ) : (
            <p>Aucun ancêtre trouvé.</p>
          )}
        </ul>
      </div>
    </>
  );
}