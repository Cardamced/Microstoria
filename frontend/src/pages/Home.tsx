import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Search from "../components/Search/Search";
import ScrollToTopButton from "../components/Buttons/ScrollToTopButton";

export default function Home() {
  const { searchValues } = useOutletContext<{
    searchValues: {
      firstname: string;
      lastname: string;
      birthdate?: string | undefined;
      birthdateStart?: string | undefined;
      birthdateEnd?: string | undefined;
      deathDate?: string | undefined;
    };
  }>();

  return (
    <>
      <Search searchValues={searchValues} />
      <ScrollToTopButton />
      {/*TODO: 
      - Ajout d'un formulaire d'inscription
      - Ajout d'un formulaire de connexion
      - Prévoir carousel des 3 ou 5 derniers ancêtres ajoutés
      - Affichage d'un croisement random entre un ancêtre, un événement et une source
      - Footer & mentions légales*/}
    </>
  );
}
