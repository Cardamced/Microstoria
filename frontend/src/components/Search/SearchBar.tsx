import { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (searchValues: {
    firstname: string;
    lastname: string;
    birthdate: string;
    birthdateStart: string;
    birthdateEnd: string;
    deathDate: string;
  }) => void;
}

const today = new Date().toLocaleDateString();
today;

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birthdateStart, setBirthdateStart] = useState("");
  const [birthdateEnd, setBirthdateEnd] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleFirstnameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const handleBirthdateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBirthdate(event.target.value);
  };

  const handleBirthdateStartChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBirthdateStart(event.target.value);
  };

  const handleBirthdateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdateEnd(e.target.value);
  };

  const handleDeathDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeathDate(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const searchValues = {
      firstname,
      lastname,
      birthdate,
      birthdateStart,
      birthdateEnd,
      deathDate,
    };
    console.log("Submitting search values:", searchValues);
    onSearch(searchValues);
  };

  return (
    <div className="search-bar-test">
      <button onClick={toggleVisibility} className="toggle-search-button">
        {isVisible ? "Réduire" : "Ouvrir"}
      </button>
      {isVisible && (
        <form onSubmit={handleSubmit} className="form-style">
          <input
            type="text"
            placeholder="Nom de famille"
            value={lastname}
            onChange={handleLastnameChange}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Prénom"
            value={firstname}
            onChange={handleFirstnameChange}
            className="search-input"
          />
          <input
            type="date" // TODO : parcourir les différents type d'input. Datetime peut être intéressant si l'on cherche un ancêtre par sa date de naissance. Attention, c'est une string.
            placeholder="Date de naissance"
            value={birthdate}
            onChange={handleBirthdateChange}
            className="search-input"
          />

          <div className="range-container">
            {/*TODO : Ajouter une logique ici qui n'affiche les range que si l'on n'a pas les dates précises*/}
            <label>Date de naissance (début)</label>
            <input
              type="range"
              min="1900-01-01"
              max="2023-12-31"
              value={birthdateStart}
              onChange={handleBirthdateStartChange}
              className="search-input"
            />
            <label>Date de naissance (fin)</label>
            <input
              type="range"
              min="1900-01-01"
              max={today}
              value={birthdateEnd}
              onChange={handleBirthdateEndChange}
              className="search-input"
            />
          </div>
          <input
            type="date" // TODO : parcourir les différents type d'input. Datetime peut être intéressant si l'on cherche un ancêtre par sa date de décès. Attention, c'est une string.
            placeholder="Date de décès"
            value={deathDate}
            onChange={handleDeathDateChange}
            className="search-input"
          />
          <button type="submit">Rechercher</button>
        </form>
      )}
    </div>
  );
}
