import react, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAncestorsById } from "./api-fetch-ancestors";
import { AncestorResponse } from "./../../shared/types/types";
import AncestorCard from "./AncestorCard";
import "./AncestorView.css";
// import AncestorEdit from "./ancestors/EditAncestor/EditAncestor";
import AncestorDeletion from "./ancestors/DeleteAncestor/AncestorDeletion";
import EditAncestor from "./ancestors/EditAncestor/EditAncestor";

export default function AncestorView({ ancestorId }: { ancestorId: number }) {
  const { id } = useParams<{ id: string }>();
  const [ancestor, setAncestor] = useState<AncestorResponse | null>(null); // Utilisation de l'état pour stocker les ancêtres
  const [error, setError] = useState<Error | null>(null);
  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/ancestors");
  };

  const toggleEdit = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
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

  // TODO : Créer la page d'affichage d'un ancêtre qui appellera :
  // - AncestorCard
  // - EditAncestor
  // - Sources
  // - Events
  return (
    <>
      <div className="Ancestorview-container">
        <div className="Ancestor-details">
          <h1>Vue de l'ancêtre</h1>
          {ancestor ? (
            <>
              <div className="cards">
                <AncestorCard
                  ancestor={ancestor}
                  onClick={handleButtonClick}
                  className={"ancestor-card"}
                />
              </div>
            </>
          ) : (
            <div>Chargement...</div>
          )}
          {/*TODO : Créer le contenu d'affichage de la biographie d'un ancêtre :*/}
          
          {ancestor ? (
            <>
              <div className="biography">
                <h3>Enfance</h3>
                <p>Blabla</p>
                <h3>Jeunesse</h3>
                <p>Blabla</p>
                <h3>Vie d'adulte</h3>
                <p>Blabla</p>
                <h3>âge mûr</h3>
                <p>Blabla</p>
                <h3>Vieillesse</h3>
                <p>Blabla</p>
                {/* <AncestorBiography
                  ancestor={ancestor}
                  onClick={handleButtonClick}
                  className={"ancestor-biography"}
                {/* <AncestorBiography
                  ancestor={ancestor}
                  onClick={handleButtonClick}
                  className={"ancestor-biography"}
                /> */}
              </div>
              
            </>
          ) : (
            <div>Chargement...</div>
            // TODO : Créer un loader animé.
          )}
          {/*TODO : Créer un composant pour la timeline*/}
          <div className="Ancestor-actions">
            <button onClick={handleButtonClick}>
              <img
                src="./../../backArrow.png"
                alt="Retour vers la liste des ancêtres"
                style={{ height: "15px", width: "15px" }}
              />
            </button>
            <button onClick={toggleEdit}>
              <img
                src="/editer.svg"
                alt="Modifier"
                style={{ height: "15px", width: "15px" }}
              />
            </button>
            {ancestor && <AncestorDeletion ancestorId={Number(id)} />}
          </div>
        </div>
        <div className="test-timeline"></div>
        <div className="Edit-form">
          {ancestor && isVisible && <EditAncestor />}
        </div>
      </div>
    </>
  );
}
