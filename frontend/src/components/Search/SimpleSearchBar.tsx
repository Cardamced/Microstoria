import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const [firstname, lastname] = inputValue.split(" ");
    onSearch({ firstname: firstname || "", lastname: lastname || "" });
  };

  return (
    <div className="champ-et-loupe-container">
        <form onSubmit={handleSearch} className="simple-search-container">
          <input
            type="text"
            placeholder="Rechercher par nom ou prénom"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="simple-search-input"
          />
          <button type="submit" className="simple-search-button">
            <img src="./loupe.svg" alt="logo-loupe" />
          </button>
        </form>
    </div>
  );
}
