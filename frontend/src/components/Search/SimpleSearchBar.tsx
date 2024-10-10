import React, { useState } from "react";
import "./SimpleSearchBar.css";

interface SimpleSearchBarProps {
  onSearch: (searchValues: {
    firstname: string;
    lastname: string;
    birthdate?: string;
    birthdateStart?: string;
    birthdateEnd?: string;
    deathDate?: string;
  }) => void;
}

export default function SimpleSearchBar({ onSearch }: SimpleSearchBarProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
    });
  };

  return (
    <div className="champ-et-loupe-container">
      <form onSubmit={handleSearch} className="simple-search-container">
        <input
          type="text"
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="simple-search-input"
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="simple-search-input"
        />
        <button type="submit" className="simple-search-button">
          <img src="./../loupe.svg" alt="logo-loupe" />
        </button>
      </form>
    </div>
  );
}