import react, { useState, useEffect } from "react";
// import PropTypes from 'prop-types'; // Import the prop-types library
import { useParams } from "react-router-dom";
import { getAncestorsById } from "./api-fetch-ancestors.tsx";
import { AncestorResponse } from "./types/types.ts";
import AncestorCard from "./AncestorCard.tsx";

export default function AncestorView() {
  const { id } = useParams<{ id: string }>();
  const [ancestor, setAncestor] = useState<AncestorResponse | null>(null); // Utilisation de l'état pour stocker les ancêtres
  const [error, setError] = useState<Error | null>(null);

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
      <div>
        {ancestor ? (
          <AncestorCard ancestor={ancestor} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}

// Add prop validation for ancestorId
// AncestorView.propTypes = {
//     ancestorId: PropTypes.string.isRequired,
// };
