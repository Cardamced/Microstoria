import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AncestorDeletion.css";

// TODO : Créer la page de suppression d'un ancêtre
// - Récupérer l'ID de l'ancêtre à supprimer
// - Faire une requête DELETE à l'API pour supprimer l'ancêtre
// - Rediriger l'utilisateur vers la liste des ancêtres
// - Gérer les erreurs
// - Afficher un message de confirmation
// - Afficher un message d'erreur
// - Afficher un message de succès
// - Gérer les états de chargement
// - Gérer les états de soumission
// - Gérer les états de validation
// - Gérer les états d'erreur
// - Gérer les états de succès
// - Gérer les états de redirection
// - Gérer les états de modification
// - Gérer les états de suppression
// - Gérer les états de création
// - Gérer les états de récupération

export default function AncestorDeletion({
  ancestorId,
}: {
  ancestorId: number;
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  console.log(ancestorId, "hop");

  async function deleteAncestor(id: number) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3009/ancestors/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'ancêtre");
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setTimeout(() => {
          navigate("/ancestors");
        }, 1000); // redirection vers /ancestors après 1 sec.
      }, 2000); // affichage du message de succès pendant 2 sec.
    } catch (error) {
      console.error("Erreur", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div>
        <button
          onClick={() => {
            deleteAncestor(ancestorId);
          }}
          disabled={isLoading}
        >
          {isLoading ? "Suppression en cours..." : "supprimer l'ancêtre"}
        </button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">Ancêtre supprimé avec succès</div>}
      </div>
    </>
  );
}
