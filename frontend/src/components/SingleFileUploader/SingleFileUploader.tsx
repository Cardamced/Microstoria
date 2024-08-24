import React, { useState } from "react";
import CustomDropzone from "../Dropzone/CustomDropzone";
// import ToggleArrow from "./../../../src/assets/toggle-arrow.svg";
import "./SingleFileUploader.css";

// Type spécifique pour la gestion de l'événement de sélection de fichier avec le type de CustomDropzone.
type FileSelectedHandler = (file: File) => void;

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
  const [isShut, setIsShut] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [originalWidth, setOriginalWidth] = useState<number | null>();
  const [originalHeight, setOriginalHeight] = useState<number | null>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  //  fonction pour traiter les fichiers sélectionnés
  const handleFileSelected: FileSelectedHandler = (file) => {
    setFile(file);
  };

  // Fonction pour gérer l'événement onChange de l'input file.
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setStatus("initial");
  //     setImageUrl(undefined);
  //     handleFileSelected(e.target.files[0]);
  //   }
  // };

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
        console.log("URL de l'image après téléversement :", imageUrl);
        setImageUrl(imageUrl);
        setUploadedFilePath(data.filePath); // Stockez le chemin d'accès au fichier
        onUploadSuccess(imageUrl ?? null);
        setStatus("success");

        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
        };
      } catch (error) {
        console.error("Erreur lors du téléversement du fichier", error);
        setStatus("fail");
      } finally {
        // TODO : Réinitialiser l'état ou d'autres actions après le téléversement.
        // On n'a pas à submit le formulaire tout de suite
      }
    }
  };

  // Toggle la fenêtre des détails du fichier uploadé.
  const toggleDetails = () => {
    setIsShut((prev) => !prev); // Toggle l'état de isShut.
    <div>coucou</div>;
  };

  return (
    <>
      <CustomDropzone onFileSelected={handleFileSelected} />
      {/* <div className="toto">
        <label htmlFor="file" className="file-label"></label>
        <input
          className="bouton-parcourir"
          id="file"
          type="file"
          onChange={handleFileChange}
        />
      </div> */}
      {/* 
      {file && (
        <button onClick={toggleDetails} className="toggle-button">
          {isShut ? "Ouvrir les détails" : "Fermer les détails"}
        </button>
      )} */}

      <p className="closing-X" onClick={toggleDetails}>
        {isShut ? (
          <img
            src="./../src/assets/toggle-arrow.svg"
            alt="Toggle Arrow"
            style={{
              height: "15px",
              transform: "rotate(90deg)",
              paddingLeft: '3px',
              // justifyItems: "center",
              // alignItems: "center",
              // TODO : Faire un bouton et le mettre dans les components.
            }}
          />
        ) : (
          <p>X</p>
        )}
      </p>
      {file && !isShut && (
        <section className="conteneur-détails">
          <div className="truc">
            <ul>
              <li>Nom: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Taille: {file.size} bytes</li>
            </ul>
            {imageUrl && (
              <div
                className="miniature-container"
                onMouseEnter={() => setShowPreview(true)}
                onMouseLeave={() => setShowPreview(false)}
              >
                <img
                  className="miniature"
                  src={`${imageUrl}`}
                  alt="Image uploadée miniature"
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "solid 1px black",
                    borderRadius: "4px",
                    zIndex: 10,
                  }}
                />
              </div>
            )}
          </div>
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

      <div className="status-messages">
        {" "}
        {/* voir animation en intégrant ci-après des variables créées plus haut avec les messages  */}
        {status === "success" && <span>✅ Téléversement réussi !</span>}
        {status === "uploading" && <span>⏳ En cours de téléversement...</span>}
        {status === "fail" && <span>❌ Échec du téléversement !</span>}
      </div>

      {showPreview && originalWidth && originalHeight && (
        <div
          className="image-preview"
          style={{
            width: "100%",
            height: "250px",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          <img
            src={`${imageUrl}`}
            alt="Aperçu de l'image en taille réelle"
            style={{
              width: originalWidth,
              height: originalHeight, // pose problème pour les très grosses images. Mais la logique consiste à limiter la taille d'upload dans les validateurs de types MIME.
              border: "solid 2px black",
              borderRadius: "5px",
              zIndex: 50,
            }}
          />
        </div>
      )}
    </>
  );
};

export default SingleFileUploader;
