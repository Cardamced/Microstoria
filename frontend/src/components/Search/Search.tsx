import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AncestorCard from "./../../AncestorCard";
import "./Search.css";

interface Ancestor {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
  death_date: Date;
}

interface SearchProps {
  searchValues: { firstname: string; lastname: string; birthdate: string; deathDate: string };
}

export default function Search({ searchValues }: SearchProps) {
  const [ancestors, setAncestors] = useState<Ancestor[]>([]);
  const [filteredAncestors, setFilteredAncestors] = useState<Ancestor[]>([]);
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate("/ancestors");
  };

  useEffect(() => {
    const fetchAncestors = async () => {
      console.log("Fetching ancestors");
      try {
        const response = await fetch(`http://localhost:3009/ancestors`);
        const data = await response.json();
        setAncestors(data);
        setFilteredAncestors(data);
        console.log(data, "fetched ancestors");
      } catch (error) {
        console.error("Erreur lors de la récupération des ancêtres:", error);
      }
    };

    fetchAncestors();
  }, []);

  useEffect(() => {
    console.log('searchValues:', searchValues); // Ajoutez ce log pour vérifier les valeurs de recherche
    const filtered = ancestors.filter((ancestor: Ancestor) => {
      const firstnameMatch = ancestor.firstname.toLowerCase().includes(searchValues.firstname.toLowerCase());
      const lastnameMatch = ancestor.lastname.toLowerCase().includes(searchValues.lastname.toLowerCase());
      const birthdateMatch = searchValues.birthdate ? new Date(ancestor.birthdate).toISOString().split('T')[0] === searchValues.birthdate : true;
      const deathDateMatch = searchValues.deathDate ? new Date(ancestor.death_date).toISOString().split('T')[0] === searchValues.deathDate : true;
      return firstnameMatch && lastnameMatch && birthdateMatch && deathDateMatch;
    });
    console.log('Filtered ancestors:', filtered); // Ajoutez ce log pour vérifier les ancêtres filtrés
    setFilteredAncestors(filtered);
  }, [searchValues, ancestors]);

  return (
    <div className="search-results">
      <h1>{`${filteredAncestors.length} résultat${filteredAncestors.length > 1 ? "s" : ""} pour "${searchValues.firstname} ${searchValues.lastname}"`}</h1>
      {/*Travailler le H1 pour ne pas avoir les guillemets quand il n'y a pas de recherche initiale*/}
      <div className="results-grid">
        {filteredAncestors.map((ancestor) => {
          const isFirstnameMatch: boolean = ancestor.firstname
            .toLowerCase()
            .includes(searchValues.firstname.toLowerCase());
          const isLastnameMatch: boolean = ancestor.lastname
            .toLowerCase()
            .includes(searchValues.lastname.toLowerCase());
          const cardClass = isFirstnameMatch
            ? "ancestor-card red-border"
            : isLastnameMatch
            ? "ancestor-card blue-border"
            : "ancestor-card";
          return (
            <AncestorCard
              key={ancestor.id}
              ancestor={ancestor}
              className={cardClass}
              onClick={() => console.log(`Clicked on ${ancestor.firstname} ${ancestor.lastname}`)}
            />
          );
        })}
      </div>
    </div>
  );
}