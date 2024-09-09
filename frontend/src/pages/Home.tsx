import { useState } from "react";
import Search from "../components/Search/Search";
import SearchBar from "../components/Search/SearchBar";
import Navbar from "../components/Navbar";

export default function Home() {
  const [searchValues, setSearchValues] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
    birthdateStart: "",
    birthdateEnd: "",
    deathDate: "",
  });

  const handleSearch = (values: {
    firstname: string;
    lastname: string;
    birthdate: string;
    birthdateStart: string;
    birthdateEnd: string;
    deathDate: string;
  }) => {
    console.log("Search values:", values);
    setSearchValues(values);
  };

  return (
    <>
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <Search searchValues={searchValues} />
    </>
  );
}
