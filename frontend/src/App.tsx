import { useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import SearchBar from './components/Search/SearchBar';

export default function App() {
  const [searchValues, setSearchValues] = useState({ firstname: '', lastname: '', birthdate: '', deathDate: '' });

  const handleSearch = (values: { firstname: string; lastname: string; birthdate: string; deathDate: string }) => {
    console.log('Search values:', values);
    setSearchValues(values);
  };

  return (
    <>
      <h1 className="HomeStyle">Microstoria</h1>
      <SearchBar onSearch={handleSearch} />
      <Search searchValues={searchValues} />
    </>
  );
}