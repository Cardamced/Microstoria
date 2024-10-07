import React, { useState, useEffect, useRef } from "react";
import CustomDropzone from "../Dropzone/CustomDropzone";
import "./SingleFileUploader.css";

type FileSelectedHandler = (file: File) => void;

interface SingleFileUploaderProps {
  onUploadSuccess: (imageUrl: string | null) => void;
  imageUrl?: string;
  originalWidth?: number;
  originalHeight?: number;
  previewMaxWidth?: number; // Nouvelle prop pour contrôler la largeur max de la preview
  previewMaxHeight?: number; // Nouvelle prop pour contrôler la hauteur max de la preview
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const SingleFileUploader: React.FC<SingleFileUploaderProps> = ({
  onUploadSuccess,
  imageUrl: initialImageUrl,
  previewMaxWidth = 300, // Valeur par défaut
  previewMaxHeight = 300, // Valeur par défaut
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"initial" | "uploading" | "success" | "fail">("initial");
  const [isShut, setIsShut] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleFileSelected: FileSelectedHandler = (file) => {
    setFile(file);
  };

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

        if (!response.ok) throw new Error("Erreur lors du téléversement");

        const data = await response.json();
        const newImageUrl = `http://localhost:3009/uploads/${data.filePath}`;
        setImageUrl(newImageUrl);
        onUploadSuccess(newImageUrl);
        setStatus("success");
      } catch (error) {
        console.error("Erreur lors du téléversement du fichier", error);
        setStatus("fail");
      }
    }
  };

  const toggleDetails = () => setIsShut(prev => !prev);

  return (
    <>
      <CustomDropzone onFileSelected={handleFileSelected} />
      <p className="closing-X" onClick={toggleDetails}>
        {isShut ? (
          <img
            src="./../src/assets/toggle-arrow.svg"
            alt="Toggle Arrow"
            style={{
              height: "15px",
              transform: "rotate(90deg)",
              paddingLeft: "3px",
            }}
          />
        ) : (
          <p>x</p>
        )}
      </p>
      {file && !isShut && (
        <section className="conteneur-détails">
          <ul>
            <li>Nom: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Taille: {formatBytes(file.size)}</li>
          </ul>
          {imageUrl && (
            <div
              className="miniature-container"
              onMouseEnter={() => setShowPreview(true)}
              onMouseLeave={() => setShowPreview(false)}
            >
              <img
                className="miniature"
                src={imageUrl}
                alt="Image uploadée miniature"
                style={{
                  width: "60px",
                  height: "60px",
                  border: "solid 1px black",
                  borderRadius: "4px",
                  zIndex: 10,
                }}
              />
              {showPreview && (
                <div 
                  className="preview-container"
                  ref={previewContainerRef}
                  style={{
                    position: 'absolute',
                    bottom: '200px',
                    zIndex: 50,
                    width: `${previewMaxWidth}px`,
                    height: `${previewMaxHeight}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    margin: '-600px'
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="Aperçu de l'image"
                    style={{
                      maxWidth: '98%',
                      maxHeight: '98%',
                      objectFit: 'contain',
                      borderRadius: "5px",
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {file && (
        <button onClick={handleUpload} disabled={!file || status === "uploading"}>
          Téléversez un fichier
        </button>
      )}

      <div className="status-messages">
        {status === "success" && <span>Téléversement réussi !</span>}
        {status === "uploading" && <span>En cours de téléversement...</span>}
        {status === "fail" && <span>Échec du téléversement !</span>}
      </div>
    </>
  );
};

export default SingleFileUploader;