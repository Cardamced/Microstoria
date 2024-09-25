import React, { useState } from "react";
import DateInput from "./../DateInput";
import "./SearchBar.css";

const SimpleSearchBar: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [weddingDate, setWeddingDate] = useState<string>("");
  const [weddingDateStart, setWeddingDateStart] = useState<string>("");
  const [weddingDateEnd, setWeddingDateEnd] = useState<string>("");
  const [weddingMode, setWeddingMode] = useState<string>("discretionary");
  const [selectedCentury, setSelectedCentury] = useState<{ startYear: number; endYear: number }>({ startYear: 0, endYear: 0 });
  const centuries = [
    { label: "18ème siècle", startYear: 1701, endYear: 1800 },
    { label: "19ème siècle", startYear: 1801, endYear: 1900 },
    // Ajoutez d'autres siècles si nécessaire
  ];

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleWeddingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeddingDate(e.target.value);
  };

  const handleWeddingModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeddingMode(e.target.value);
  };

  const handleCenturyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const century = centuries[parseInt(e.target.value)];
    setSelectedCentury(century);
  };

  const handleWeddingDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeddingDateStart(e.target.value);
  };

  const handleWeddingDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeddingDateEnd(e.target.value);
  };

  return (
    <div className="champ-et-loupe-container">
      <div className="button-group">
        <button onClick={() => handleTypeChange("naissance")}>Naissance</button>
        <button onClick={() => handleTypeChange("mariage")}>Mariage</button>
        <button onClick={() => handleTypeChange("décès")}>Décès</button>
      </div>
      {selectedType && (
        <DateInput
          type={selectedType}
          date={weddingDate}
          dateStart={weddingDateStart}
          dateEnd={weddingDateEnd}
          mode={weddingMode}
          centuries={centuries}
          selectedCentury={selectedCentury}
          handleDateChange={handleWeddingDateChange}
          handleModeChange={handleWeddingModeChange}
          handleCenturyChange={handleCenturyChange}
          handleDateStartChange={handleWeddingDateStartChange}
          handleDateEndChange={handleWeddingDateEndChange}
        />
      )}
    </div>
  );
};

export default SimpleSearchBar;