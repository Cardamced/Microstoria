import { useState, useRef, useEffect } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (searchValues: {
    firstname: string;
    lastname: string;
    birthdate: string;
    birthdateStart: string;
    birthdateEnd: string;
    deathDate: string;
    deathDateStart: string;
    deathDateEnd: string;
  }) => void;
}

const today = new Date().getFullYear();
const centuries = Array.from({ length: 21 }, (_, i) => ({
  label: `${i + 1}e siècle`,
  startYear: i * 100 + 1,
  endYear: (i + 1) * 100,
}));

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birthdateStart, setBirthdateStart] = useState("1900-01-01");
  const [birthdateEnd, setBirthdateEnd] = useState(today.toString());
  const [deathDate, setDeathDate] = useState("");
  const [deathDateStart, setDeathDateStart] = useState("1900-01-01");
  const [deathDateEnd, setDeathDateEnd] = useState(today.toString());
  const [selectedCentury, setSelectedCentury] = useState(centuries[19]); // 20e siècle par défaut
  const [isVisible, setIsVisible] = useState(true);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Logique d'ouverture/fermeture du formulaire de recherche - click outside.
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

  const handleDeathDateStartChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeathDateStart(e.target.value);
  };

  const handleDeathDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeathDateEnd(e.target.value);
  };

  const handleCenturyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCentury = centuries[parseInt(event.target.value)];
    setSelectedCentury(selectedCentury);
    setBirthdateStart(selectedCentury.startYear.toString());
    setBirthdateEnd(selectedCentury.endYear.toString());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const searchValues = {
      firstname,
      lastname,
      birthdate,
      birthdateStart: birthdateStart.toString(),
      birthdateEnd: birthdateEnd.toString(),
      deathDate,
      deathDateStart: deathDateStart.toString(),
      deathDateEnd: deathDateEnd.toString(),
    };
    console.log("Submitting search values:", searchValues);
    onSearch(searchValues);
  };

  return (
    <div
      className={`search-bar-test ${isVisible ? "" : "hidden"}`}
      ref={searchBarRef}
    >
      <button onClick={toggleVisibility} className="toggle-search-button">
        {isVisible ? "Réduire" : "Ouvrir"}
      </button>{" "}
      {/* TODO : Voir à bouger le bouton à l'intérieur ou pas pour cacher complètement la div*/}
      {isVisible && (
        <>
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
            {!birthdate && (
              <div className="range-container-birthdate">
                <label>Choisir un siècle</label>
                <select onChange={handleCenturyChange} className="century-select">
                  {centuries.map((century, index) => (
                    <option key={index} value={index}>
                      {century.label}
                    </option>
                  ))}
                </select>
                <label>Date de naissance (début)</label>
                <input
                  type="range"
                  min={selectedCentury.startYear}
                  max={selectedCentury.endYear}
                  value={birthdateStart}
                  onChange={handleBirthdateStartChange}
                  className="search-input-range-birthdate"
                />
                <span>{birthdateStart}</span>
                <label>Date de naissance (fin)</label>
                <input
                  type="range"
                  min={selectedCentury.startYear}
                  max={selectedCentury.endYear}
                  value={birthdateEnd}
                  onChange={handleBirthdateEndChange}
                  className="search-input-range-birthdate"
                />
                <span>{birthdateEnd}</span>
              </div>
            )}
            <input
              type="date" // TODO : parcourir les différents type d'input. Datetime peut être intéressant si l'on cherche un ancêtre par sa date de décès. Attention, c'est une string.
              placeholder="Date de décès"
              value={deathDate}
              onChange={handleDeathDateChange}
              className="search-input"
            />
            {!deathDate && (
              <div className="range-container-deathdate">
                <label>Choisir un siècle</label>
                <select onChange={handleCenturyChange} className="century-select">
                  {centuries.map((century, index) => (
                    <option key={index} value={index}>
                      {century.label}
                    </option>
                  ))}
                </select>
                <label>Date de décès (début)</label>
                <input
                  type="range"
                  min={selectedCentury.startYear}
                  max={selectedCentury.endYear}
                  value={deathDateStart}
                  onChange={handleDeathDateStartChange}
                  className="search-input-range-deathdate"
                />
                <span>{deathDateStart}</span>
                <label>Date de décès (fin)</label>
                <input
                  type="range"
                  min={selectedCentury.startYear}
                  max={selectedCentury.endYear}
                  value={deathDateEnd}
                  onChange={handleDeathDateEndChange}
                  className="search-input-range-deathdate"
                />
                <span>{deathDateEnd}</span>
              </div>
            )}
            <button type="submit">Rechercher</button>
          </form>
          <div className="map">
            <span style={{ color: "black" }}>
              A venir : Recherche géographique
            </span>
            <img
              src="./france-departments.svg"
              alt="Placeholder carte"
              style={{ height: "400px", cursor: "pointer" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
