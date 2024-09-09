// MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Assurez-vous que ce chemin est correct
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <>
      <Navbar /> {/* Navbar visible sur toutes les pages sauf l'accueil */}
      <div className="content">
        <Outlet /> {/* Emplacement pour le rendu des pages enfants */}
      </div>
    </>
  );
}
