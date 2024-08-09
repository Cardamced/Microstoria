import * as React from "react";
import { useForm } from "react-hook-form";
import { Ancestor } from "./types/types";
import "./AncestorNewForm.css";

// on importe le type Ancestor pour le formulaire.
// Cela évite de réécrire tous les types des propriétés du formulaire.

type FormData = Ancestor;

// Création d'un fonction qui transforme les chaînes vides en "null" pour les valeurs du formulaire.
// Évite les erreurs de valeurs incorrectes et les erreurs 404 Cannot POST.

//1)  <T> est un type générique. Il permet de définir un type de manière dynamique.
// La fonction attendra le même type que le type de l'objet.
//2)  On crée ensuite un nouvel objet auquel on assigne toutes les propriétés
// de l'objet passé en paramètre grâce au spread operator.
//3) On parcourt ensuite toutes les propriétés de l'objet avec une boucle for...in.
// les conditions vérifient la valeur des associées aux clés et les change en "null" si elles sont vides.
//4) On return le nouvel objet avec les valeurs modifiées.

function convertEmptyStringsToNull<T>(obj: T): T {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key as keyof T] === '') {
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

  const onSubmit = async (data: FormData) => {
    // Convertir les chaînes vides en null
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
      // TODO : ajouter ici une modale indiquant le succès de l'opération
    } catch (error) {
      console.error("Erreur", error);
      // TODO : ajouter un message d'erreur à l'utilisateur.
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
          <input className="input-style" {...register("gender")} />
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
    </>
  );
}
