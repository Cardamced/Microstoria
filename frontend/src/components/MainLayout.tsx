// MainLayout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Assurez-vous que ce chemin est correct
import "./MainLayout.css";

export default function MainLayout() {
  const [searchValues, setSearchValues] = useState<{
    firstname: string;
    lastname: string;
    birthdate?: string | null;
    birthdateStart?: string | null;
    birthdateEnd?: string | null;
    deathDate?: string | null;
  }>({
    firstname: "",
    lastname: "",
    birthdate: null,
    birthdateStart: null,
    birthdateEnd: null,
    deathDate: null,
  });

  const handleSearch = (values: {
    firstname: string;
    lastname: string;
    birthdate?: string | null;
    birthdateStart?: string | null;
    birthdateEnd?: string | null;
    deathDate?: string | null;
  }) => {
    console.log("Search values from MainLayout:", values);
    setSearchValues(values);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} /> {/*Navbar visible sur toutes les pages sauf l'accueil */}
      <div className="content">
        <Outlet context={{ searchValues }} /> {/* Emplacement pour le rendu des pages enfants */}
      </div>
    </>
  );
}
