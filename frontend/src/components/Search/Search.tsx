import { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import AncestorCard from "./../../AncestorCard";
import Pagination from "../Pagination";
import "./Search.css";

interface Ancestor {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
  death_date: Date;
}

interface SearchProps {
  searchValues: {
    firstname: string;
    lastname: string;
    birthdate?: string;
    birthdateStart?: string;
    birthdateEnd?: string;
    deathDate?: string;
    deathDateStart?: string;
    deathDateEnd?: string;
  };
}

export default function Search({ searchValues }: SearchProps) {
  const [ancestors, setAncestors] = useState<Ancestor[]>([]);
  const [filteredAncestors, setFilteredAncestors] = useState<Ancestor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/ancestors");
  };

  // Pagination des résultats d'affichage des ancêtres.
  const handleResultsPerPageChange = (event: any) => {
    setResultsPerPage(parseInt(event.target.value));
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
    if (
      searchValues.firstname ||
      searchValues.lastname ||
      searchValues.birthdate ||
      searchValues.birthdateStart ||
      searchValues.birthdateEnd ||
      searchValues.deathDate ||
      searchValues.deathDateStart ||
      searchValues.deathDateEnd
    ) {
      console.log("searchValues:", searchValues); // Log de vérification des valeurs de recherche
      const filtered = ancestors.filter((ancestor: Ancestor) => {
        const firstnameMatch = ancestor.firstname
          .toLowerCase()
          .includes(searchValues.firstname.toLowerCase());
        const lastnameMatch = ancestor.lastname
          .toLowerCase()
          .includes(searchValues.lastname.toLowerCase());
        const birthdateMatch = searchValues.birthdate
          ? new Date(ancestor.birthdate).toISOString().split("T")[0] ===
            searchValues.birthdate
          : true;
        const birthdateStartMatch = searchValues.birthdateStart
          ? new Date(ancestor.birthdate).getFullYear() >=
            parseInt(searchValues.birthdateStart)
          : true;
        const birthdateEndMatch = searchValues.birthdateEnd
          ? new Date(ancestor.birthdate).getFullYear() <=
            parseInt(searchValues.birthdateEnd)
          : true;
        const deathDateMatch = searchValues.deathDate
          ? new Date(ancestor.death_date).toISOString().split("T")[0] ===
            searchValues.deathDate
          : true;
          const deathDateStartMatch = searchValues.deathDateStart
          ? new Date(ancestor.death_date).getFullYear() >=
            parseInt(searchValues.deathDateStart)
          : true;
        const deathDateEndMatch = searchValues.deathDateEnd
          ? new Date(ancestor.death_date).getFullYear() <=
            parseInt(searchValues.deathDateEnd)
          : true;
        return (
          firstnameMatch &&
          lastnameMatch &&
          birthdateMatch &&
          birthdateStartMatch &&
          birthdateEndMatch &&
          deathDateMatch &&
          deathDateStartMatch &&
          deathDateEndMatch
        );
      });
      console.log("Filtered ancestors:", filtered); // Ajoutez ce log pour vérifier les ancêtres filtrés
      setFilteredAncestors(filtered);
    } else {
      setFilteredAncestors([]);
    }
  }, [searchValues, ancestors]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedAncestors = filteredAncestors.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const totalPages = Math.ceil(filteredAncestors.length / resultsPerPage);

  console.log("paginated", paginatedAncestors);
  console.log("paginated", currentPage);
  console.log("nombre de pages", totalPages);

  return (
    <div className="search-results">
      <div className="results-specs">
        <h3>
          {filteredAncestors.length === 0
            ? "Aucun résultat"
            : `${filteredAncestors.length} résultat${
                filteredAncestors.length > 1 ? "s" : ""
              }`}
        </h3>
        <select
          value={resultsPerPage}
          onChange={handleResultsPerPageChange}
          className="pagination-select"
        >
          <option value="12">12 résultats par page</option>
          <option value="24">24 résultats par page</option>
          <option value="48">48 résultats par page</option>
          <option value="100">100 résultats par page</option>
        </select>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {/*Travailler le H1 pour ne pas avoir les guillemets quand il n'y a pas de recherche initiale*/}
      <div className="results-grid">
        {paginatedAncestors.map((ancestor) => {
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
              onClick={() =>
                console.log(
                  `Clicked on ${ancestor.firstname} ${ancestor.lastname}`,
                  navigate(`/ancestors/${ancestor.id}`)
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}
