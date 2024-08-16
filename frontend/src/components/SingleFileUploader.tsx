import React, { useState } from "react";
import "./SingleFileUploader.css";

interface SingleFileUploaderProps {
  onUploadSuccess: (imageUrl: string | null) => void;
}

const SingleFileUploader: React.FC<SingleFileUploaderProps> = ({
  onUploadSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
      setImageUrl(undefined);
    }
  };

  // NB : 1) le type file de l'input est une fonctionnalité gérée par les navigateurs
  // Elle permet d'ouvrir la boîte de dialogue avec le système de fichiers de l'utilisateur.
  // 2) la logique de téléchargement recourt à fetch API et FormData.
  // Fetch requête et FormData est une interface qui va ajouter les fichiers à la payload fetchée.

  const handleUpload = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:3009/uploads", {
          method: "POST",
          body: formData,
        });

        console.log("response", response.body);
        console.log(response.status);
        if (!response.ok) {
          throw new Error("Erreur lors du téléversement");
        }

        const data = await response.json();
        const imageUrl = `http://localhost:3009/uploads/${data.filePath}`;
        console.log('URL de l\'image après téléversement :', imageUrl);
        setImageUrl(imageUrl);
        setUploadedFilePath(data.filePath); // Stockez le chemin d'accès au fichier
        onUploadSuccess(imageUrl ?? null);
        setStatus("success");
      } catch (error) {
        console.error("Erreur lors du téléversement du fichier", error);
        setStatus("fail");
      } finally {
        // TODO : Réinitialiser l'état ou d'autres actions après le téléversement.
        // On n'a pas à submit le formulaire tout de suite
      }
    }
  };

  return (
    <>
      <div>
        <label htmlFor="file" className="sr-only">
          Choisissez un fichier
        </label>
        <input
          className="bouton-parcourir"
          id="file"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      {file && (
        <section className="conteneur-détails">
          Détails du fichier:
          <ul>
            <li>Nom: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Taille: {file.size} bytes</li>
            {imageUrl && (
              <img
                src={`${imageUrl}`}
                alt="Image uploadée"
                style={{ width: "160px", height: "160px", border: 'solid 2px black', borderRadius: '5px', zIndex: 10 }}
              />
            )}
          </ul>
        </section>
      )}

      {file && (
        <button
          onClick={handleUpload}
          disabled={!file || status === "uploading"}
        >
          Téléversez un fichier
        </button>
      )}

      {status === "success" && <p>✅ Téléversement réussi !</p>}
      {status === "fail" && <p>❌ Échec du téléversement !</p>}
      {status === "uploading" && <p>⏳ En cours de téléversement...</p>}
    </>
  );
};

export default SingleFileUploader;
