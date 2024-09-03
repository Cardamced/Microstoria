import { useState } from "react";
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (searchValues: { firstname: string; lastname: string; birthdate: string; deathDate: string }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [deathDate, setDeathDate] = useState('');

  const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const handleBirthdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(event.target.value);
  };

  const handleDeathDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeathDate(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const searchValues = { firstname, lastname, birthdate, deathDate };
    console.log('Submitting search values:', searchValues);
    onSearch(searchValues);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="form-style">
        <input
          type="text"
          placeholder="Prénom"
          value={firstname}
          onChange={handleFirstnameChange}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Nom de famille"
          value={lastname}
          onChange={handleLastnameChange}
          className="search-input"
        />
        <input
          type="date"
          placeholder="Date de naissance"
          value={birthdate}
          onChange={handleBirthdateChange}
          className="search-input"
        />
        <input
          type="date"
          placeholder="Date de décès"
          value={deathDate}
          onChange={handleDeathDateChange}
          className="search-input"
        />
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
}