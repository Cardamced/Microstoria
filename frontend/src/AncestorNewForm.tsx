import * as React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ancestor } from "./types/types";
import { Gender } from "./../../backend/src/ancestors/ancestor.entity";
import "./AncestorNewForm.css";

// on importe le type Ancestor pour le formulaire.
// Cela évite de réécrire tous les types des propriétés du formulaire.

type FormData = Ancestor;

// Création d'un fonction qui transforme les chaînes vides en "null" pour les valeurs du formulaire.
// Évite les erreurs de valeurs incorrectes et les erreurs 404 Cannot POST.

//1) <T> est un type générique. Il permet de définir un type de manière dynamique.
// La fonction attendra le même type que le type de l'objet.
//2) On crée ensuite un nouvel objet auquel on assigne toutes les propriétés
// de l'objet passé en paramètre grâce au spread operator.
//3) On parcourt ensuite toutes les propriétés de l'objet avec une boucle for...in.
// les conditions vérifient la valeur des associées aux clés et les change en "null" si elles sont vides.
//4) On return le nouvel objet avec les valeurs modifiées.

function convertEmptyStringsToNull<T>(obj: T): T {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key as keyof T] === "") {
      newObj[key as keyof T] = null as any;
    }
  }
  return newObj;
}

export default function CreateAncestor() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isSubmitted, setIsSubmitted] = useState<Boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<Boolean>(false);
  const [alertMessage, setAlertMessage] = useState({
    lastname: "",
    firstname: "",
    gender: "",
  });

  const [gender, setGender] = useState<Gender>();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValue(name as keyof FormData, value as any); // essayer avec string.
  };

  const handleGenderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setGender(e.target.value as Gender);
    setValue("gender", e.target.value as Gender);
  };
  const onSubmit = async (data: FormData) => {
    // règle de champ minimal à remplir.
    const fields = [
      { name: "lastname", message: "Le nom est requis." },
      { name: "firstname", message: "Le prénom est requis." },
      { name: "gender", message: "Le genre est requis." },
    ];

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //   const { name, value } = e.target;
    //   setData(prevData => ({
    //     ...prevData,
    //     [name]: value
    //   }));
    // };

    let hasError = false;
    const newAlertMessage: { [key: string]: string | Gender } = {
      ...alertMessage,
    };

    fields.forEach((field) => {
      if (!data[field.name as keyof FormData]) {
        newAlertMessage[field.name] = field.message;
        hasError = true;
      } else {
        newAlertMessage[field.name] = "";
      }
    });

    setAlertMessage(newAlertMessage);

    if (hasError) {
      return;
    }
    if (!data.lastname && !data.firstname && !data.gender) {
      alert("veuillez remplir au moins un champ.");
      return;
    }
    setIsSubmitted(true);
    // Convertir les chaînes vides en null.
    const dataToSubmit = convertEmptyStringsToNull(data);
    try {
      const response = await fetch("http://localhost:3009/ancestors/new", {
        method: "POST",
        headers: {
          "content-type": "application/json", // indique que le corps de la requête est au format json.
        },
        body: JSON.stringify(dataToSubmit),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement des données");
      }

      const result = await response.json(); // sert à parser la réponse json.
      console.log("enregistrement réussi :", result);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate(`/ancestors/${result.id}`);
      }, 3000); // affiche la modale pendant 5 secondes avant de rediriger vers la page de l'ancêtre.

      // TODO : ajouter ici une modale indiquant le succès de l'opération
    } catch (error) {
      console.error("Erreur", error);
      // TODO : ajouter un message d'erreur à l'utilisateur.
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <h1>Création d'un nouvel ancêtre</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label className="label-style">Nom</label>
          <input className="input-style" {...register("lastname")} />
        </div>
        <div className="input-container">
          <label className="label-style">Prénom</label>
          <input className="input-style" {...register("firstname")} />
        </div>
        <div className="input-container">
          <label className="label-style">Image</label>
          <input className="input-style" {...register("image")} />
        </div>
        <div className="input-container">
          <label className="label-style">Date de naissance</label>
          <input className="input-style" {...register("birthdate")} />
        </div>
        <div className="input-container">
          <label className="label-style">Lieu de naissance</label>
          <input className="input-style" {...register("birth_place")} />
        </div>
        <div className="input-container">
          <label className="label-style">Date de mariage</label>
          <input className="input-style" {...register("wedding_date")} />
        </div>
        <div className="input-container">
          <label className="label-style">Lieu de mariage</label>
          <input className="input-style" {...register("wedding_place")} />
        </div>
        <div className="input-container">
          <label className="label-style">Date de décès</label>
          <input className="input-style" {...register("death_date")} />
        </div>
        <div className="input-container">
          <label className="label-style">Lieu de décès</label>
          <input className="input-style" {...register("death_place")} />
        </div>
        <div className="input-container">
          <label className="label-style">Genre</label>
          <select
            className="select"
            {...register("gender", { onChange: (e) => handleGenderChange(e) })}
            value={gender}
          >
            <option value=""></option>
            <option value="female">Féminin</option>
            <option value="male">Masculin</option>
            <option value="unknown">Inconnu</option>
          </select>
          {/* <input className="input-style" {...register("gender")} /> */}
        </div>
        {/* <div className="input-container">
        <label className="label-style">sosa</label>
        <input className="input-style" {...register("sosa")} />
      </div> */}
        <div className="input-container">
          <label className="label-style">Métier</label>
          <input className="input-style" {...register("occupation")} />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
      {showSuccessModal && (
        <div className="modal">
          <p>Enregistrement réussi !</p>
        </div>
      )}
    </>
  );
}
