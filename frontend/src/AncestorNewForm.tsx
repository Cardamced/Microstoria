import * as React from "react";
import { useForm } from "react-hook-form";
import { Ancestor } from "./types/types";
import "./AncestorNewForm.css";

// on importe le type Ancestor pour le formulaire.
// Cela évite de réécrire tous les types des propriétés du formulaire.

type FormData = Ancestor;

export default function CreateNewAncestor2() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`https://api.localhost:3009/ancestors`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement des données");
      }

      const result = await response.json();
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
        <button
          type="submit"
          onClick={() => {
          }}
        >
          Enregistrer
        </button>
      </form>
    </>
  );
}
