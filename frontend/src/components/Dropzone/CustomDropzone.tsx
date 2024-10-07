import React from "react";
import Dropzone from "react-dropzone";
import "./CustomDropzone.css";

// Type spécifique pour la fonction de sélection de fichier
type FileSelectedHandler = (file: File) => void;

interface CustomDropzoneProps {
  onFileSelected: FileSelectedHandler;
}

const CustomDropzone: React.FC<CustomDropzoneProps> = ({ onFileSelected }) => {
  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        console.log(acceptedFiles);
        if (acceptedFiles.length > 0) {
          onFileSelected(acceptedFiles[0]); // appel de la fonction avec un seul fichier.
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <img src="./../AddImage.png" alt="ajoutez une image" className="dropSign"></img>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default CustomDropzone;
