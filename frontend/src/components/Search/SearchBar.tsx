import { useState, useRef, useEffect } from "react";
import "./SearchBar.css";
import MapAncestors from "../Carte/MapAncestors";

interface SearchBarProps {
  onSearch: (searchValues: {
    firstname: string;
    lastname: string;
    birthdate: string | null;
    birthdateStart: string | null;
    birthdateEnd: string | null;
    weddingDate: string | null;
    weddingDateStart: string | null;
    weddingDateEnd: string | null;
    deathDate: string | null;
    deathDateStart: string | null;
    deathDateEnd: string | null;
  }) => void;
}

// Variables de dates : instant présent et tableau des siècles de l'ère chrétienne.
const today = new Date().getFullYear();
const centuries = Array.from({ length: 21 }, (_, i) => ({
  label: `${i + 1}e siècle`,
  startYear: i * 100 + 1,
  endYear: (i + 1) * 100,
}));

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [birthdateStart, setBirthdateStart] = useState<string | null>(null);
  const [birthdateEnd, setBirthdateEnd] = useState<string | null>(null);
  const [weddingDate, setWeddingDate] = useState<string | null>(null);
  const [weddingDateStart, setWeddingDateStart] = useState<string | null>(null);
  const [weddingDateEnd, setWeddingDateEnd] = useState<string | null>(null);
  const [deathDate, setDeathDate] = useState<string | null>(null);
  const [deathDateStart, setDeathDateStart] = useState<string | null>(null);
  const [deathDateEnd, setDeathDateEnd] = useState<string | null>(null);
  const [selectedCentury, setSelectedCentury] = useState(centuries[19]); // 20e siècle par défaut
  const [isVisible, setIsVisible] = useState(true);
  const [birthMode, setBirthMode] = useState("discretionary"); // Mode par défaut
  const [weddingMode, setWeddingMode] = useState("discretionary"); // Mode par défaut
  const [deathMode, setDeathMode] = useState("discretionary"); // Mode par défaut
  const [geoSearch, setGeoSearch] = useState(false);
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
    setBirthdate(event.target.value || null);
  };

  const handleBirthdateStartChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBirthdateStart(event.target.value || null);
  };

  const handleBirthdateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdateEnd(e.target.value || null);
  };

  const handleWeddingDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWeddingDate(event.target.value || null);
  };

  const handleWeddingDateStartChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWeddingDateStart(event.target.value || null);
  };

  const handleWeddingDateEndChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWeddingDateEnd(e.target.value || null);
  };

  const handleDeathDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeathDate(event.target.value || null);
  };

  const handleDeathDateStartChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeathDateStart(e.target.value || null);
  };

  const handleDeathDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeathDateEnd(e.target.value || null);
  };

  const handleCenturyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCentury = centuries[parseInt(event.target.value)];
    setSelectedCentury(selectedCentury);
    setBirthdateStart(selectedCentury.startYear.toString());
    setBirthdateEnd(selectedCentury.endYear.toString());
  };

  // Choix du mode de sélection des dates de recherche.
  const handleBirthModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBirthMode(event.target.value);
  };
  const handleWeddingModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWeddingMode(event.target.value);
  };
  const handleDeathModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDeathMode(event.target.value);
  };

  // Ouverture de la carte.
  const handleGeoSearchToggle = () => {
    setGeoSearch(!geoSearch);
    console.log("el famoso", geoSearch);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Erreur si la borne de début est supérieure à la borne de fin.
    if (
      birthdateStart &&
      birthdateEnd &&
      parseInt(birthdateEnd) < parseInt(birthdateStart)
    ) {
      alert("La date de début doit être antérieure à la date de fin.");
      return;
    }
    if (
      weddingDateStart &&
      weddingDateEnd &&
      parseInt(weddingDateEnd) < parseInt(weddingDateStart)
    ) {
      alert("La date de début doit être antérieure à la date de fin.");
      return;
    }
    if (
      deathDateStart &&
      deathDateEnd &&
      parseInt(deathDateEnd) < parseInt(deathDateStart)
    ) {
      alert("La date de début doit être antérieure à la date de fin.");
      return;
    }
    const searchValues = {
      firstname,
      lastname,
      birthdate,
      birthdateStart,
      birthdateEnd,
      weddingDate,
      weddingDateStart,
      weddingDateEnd,
      deathDate,
      deathDateStart,
      deathDateEnd,
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
            <button
              className="close-modale-recherche"
              onClick={toggleVisibility}
            >
              X
            </button>
            <input
              type="text"
              placeholder="Nom"
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
            <span>Naissance</span>
            <input
              type="date" // TODO : parcourir les différents type d'input. Datetime peut être intéressant si l'on cherche un ancêtre par sa date de naissance. Attention, c'est une string.
              placeholder="Date de naissance"
              value={birthdate || ""}
              onChange={handleBirthdateChange}
              className="search-input"
            />
            <div className="custom-birthdates-research">
              {/* <button className="close-custom-birthdates" onClick={toggleVisibility}>x</button> */}
              <div className="date-selection">
                <label>Sélection des dates</label>
                <select
                  onChange={handleBirthModeChange}
                  className="mode-select"
                >
                  <option value="discretionary">Libre</option>
                  <option value="century">Par siècle</option>
                </select>
              </div>
              <div className="coucou-birthdates">
                {!birthdate && birthMode === "century" && (
                  <div className="range-container-birthdate">
                    <div className="select-siècle">
                      <label>Choisir un siècle</label>
                      <select
                        onChange={handleCenturyChange}
                        className="century-select"
                      >
                        <option value=""></option>
                        {centuries.map((century, index) => (
                          <option key={index} value={index}>
                            {century.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="range-années">
                      <label>Né(e) entre</label>
                      <input
                        type="range"
                        min={selectedCentury.startYear}
                        max={selectedCentury.endYear}
                        value={birthdateStart || ""}
                        onChange={handleBirthdateStartChange}
                        className="search-input-range-birthdate"
                      />
                      <span>{birthdateStart}</span>
                    </div>
                    <div className="range-années">
                      <label>et</label>
                      <input
                        type="range"
                        min={selectedCentury.startYear}
                        max={selectedCentury.endYear}
                        value={birthdateEnd || ""}
                        onChange={handleBirthdateEndChange}
                        className="search-input-range-birthdate"
                      />
                      <span>{birthdateEnd}</span>
                    </div>
                  </div>
                )}
                {/*Naissance : fourchette personnalisée*/}
                {!birthdate && birthMode === "discretionary" && (
                  <div className="range-container-birthdate">
                    <div className="bornes-dates">
                      <label>Né(e) entre</label>
                      <input
                        type="number"
                        min="0000"
                        max={today}
                        value={birthdateStart || ""}
                        onChange={handleBirthdateStartChange}
                        className="search-input-range-birthdate"
                      />
                      {/* </div>
                    <div className="borne-haute"> */}
                      <label>et</label>
                      <input
                        type="number"
                        min="0000"
                        max={today}
                        value={birthdateEnd || ""}
                        onChange={handleBirthdateEndChange}
                        className="search-input-range-birthdate"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <span>Mariage</span>
            <input
              type="date" // TODO : parcourir les différents type d'input. Datetime peut être intéressant si l'on cherche un ancêtre par sa date de mariage. Attention, c'est une string.
              placeholder="Date de mariage"
              value={weddingDate || ""}
              onChange={handleWeddingDateChange}
              className="search-input"
            />
            <div className="custom-weddingdates-research">
              <div className="date-selection">
                <label>Sélection des dates</label>
                <select
                  onChange={handleWeddingModeChange}
                  className="mode-select"
                >
                  <option value="discretionary">Libre</option>
                  <option value="century">Par siècle</option>
                </select>
              </div>
              <div className="coucou-weddingdates">
                {!weddingDate && weddingMode === "century" && (
                  <div className="range-container-weddingdate">
                    <div className="select-siècle">
                      <label>Choisir un siècle</label>
                      <select
                        onChange={handleCenturyChange}
                        className="century-select"
                      >
                        <option value=""></option>
                        {centuries.map((century, index) => (
                          <option key={index} value={index}>
                            {century.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="range-années">
                      <label>Marié(e) entre</label>
                      <input
                        type="range"
                        min={selectedCentury.startYear}
                        max={selectedCentury.endYear}
                        value={weddingDateStart || ""}
                        onChange={handleWeddingDateStartChange}
                        className="search-input-range-weddingdate"
                      />
                      <span>{weddingDateStart}</span>
                    </div>
                    <div className="range-années">
                      <label>et</label>
                      <input
                        type="range"
                        min={selectedCentury.startYear}
                        max={selectedCentury.endYear}
                        value={weddingDateEnd || ""}
                        onChange={handleWeddingDateEndChange}
                        className="search-input-range-weddingdate"
                      />
                      <span>{weddingDateEnd}</span>
                    </div>
                  </div>
                )}
                {!weddingDate && weddingMode === "discretionary" && (
                  <div className="range-container-weddingdate">
                    <div className="bornes-dates">
                      <label>Marié(e) entre</label>
                      <input
                        type="number"
                        min="0000"
                        max={today}
                        value={weddingDateStart || ""}
                        onChange={handleWeddingDateStartChange}
                        className="search-input-range-weddingdate"
                      />
                      <label>et</label>
                      <input
                        type="number"
                        min="0000"
                        max={today}
                        value={weddingDateEnd || ""}
                        onChange={handleWeddingDateEndChange}
                        className="search-input-range-weddingdate"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <span>Décès</span>
            <input
              type="date" // TODO : parcourir les différents type d'input. Datetime peut être intéressant si l'on cherche un ancêtre par sa date de décès. Attention, c'est une string.
              placeholder="Date de décès"
              value={deathDate || ""}
              onChange={handleDeathDateChange}
              className="search-input"
            />
            {/*Décès : fourchette personnalisée*/}
            <div className="custom-deathdates-research">
              {/* <button className="close-custom-deathdates" onClick={toggleVisibility}>x</button> */}
              <div className="date-selection">
                <label>Sélection des dates</label>
                <select
                  onChange={handleDeathModeChange}
                  className="mode-select"
                >
                  <option value="discretionary">Libre</option>
                  <option value="century">Par siècle</option>
                </select>
              </div>
              <div className="coucou-deathdates">
                {!deathDate && deathMode === "century" && (
                  <div className="range-container-deathdate">
                    <div className="select-siècle">
                      <label>Choisir un siècle</label>
                      <select
                        onChange={handleCenturyChange}
                        className="century-select"
                      >
                        <option value=""></option>
                        {centuries.map((century, index) => (
                          <option key={index} value={index}>
                            {century.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="range-années">
                      <label>Décédé(e) entre</label>
                      <input
                        type="range"
                        min={selectedCentury.startYear}
                        max={selectedCentury.endYear}
                        value={deathDateStart || ""}
                        onChange={handleDeathDateStartChange}
                        className="search-input-range-deathdate"
                      />
                      <span>{deathDateStart}</span>
                    </div>
                    <div className="range-années">
                      <label>et</label>
                      <input
                        type="range"
                        min={selectedCentury.startYear}
                        max={selectedCentury.endYear}
                        value={deathDateEnd || ""}
                        onChange={handleDeathDateEndChange}
                        className="search-input-range-deathdate"
                      />
                      <span>{deathDateEnd}</span>
                    </div>
                  </div>
                )}
                {/*Décès : fourchette personnalisée*/}
                {!deathDate && deathMode === "discretionary" && (
                  <div className="range-container-deathdate">
                    <div className="bornes-dates">
                      <label>Décédé(e) entre</label>
                      <input
                        type="number"
                        min="0000"
                        max={today}
                        value={deathDateStart || ""}
                        onChange={handleDeathDateStartChange}
                        className="search-input-range-deathdate"
                      />
                      <label>et</label>
                      <input
                        type="number"
                        min="0000"
                        max={today}
                        value={deathDateEnd || ""}
                        onChange={handleDeathDateEndChange}
                        className="search-input-range-deathdate"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button type="submit">Rechercher</button>
            <button
              type="button"
              className="btn-geo-search"
              onClick={() => setGeoSearch(!geoSearch)}
            >
              Recherche géographique
            </button>
          </form>
          <div className={geoSearch ? "search-map-shown" : "search-map-hidden"}>
            {/* <span style={{ color: "black" }}>
              A venir : Recherche géographique
            </span> */}
            {/* <img
              src="./france-departments.svg"
              alt="Placeholder carte"
              // style={{ height: "400px", cursor: "pointer" }}
              onClick={handleGeoSearchToggle}
            /> */}
            <MapAncestors context="search-bar" containerClassName="search-map"/>
          </div>
        </>
      )}
    </div>
  );
}
