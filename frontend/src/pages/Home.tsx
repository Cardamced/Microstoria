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
    </>
  );
}
