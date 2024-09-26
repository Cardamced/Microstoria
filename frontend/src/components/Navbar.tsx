import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SimpleSearchBar from "./Search/SimpleSearchBar";
import SearchBar from "./Search/SearchBar";
import "./Navbar.css";

interface NavbarProps {
  onSearch: (values: {
    firstname: string;
    lastname: string;
    birthdate?: string | null;
    birthdateStart?: string | null;
    birthdateEnd?: string | null;
    weddingDate?: string | null;
    weddingDateStart?: string | null;
    weddingDateEnd?: string | null;
    deathDate?: string | null;
    deathDateStart?: string | null;
    deathDateEnd?: string | null;
  }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);
  // const [isSearchOpened, setIsSearchOpened] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Logique de choix de la recherche : simple ou avancée.
  const toggleSearchMode = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
    // setIsVisible(true);
    // setIsSearchOpened(true);
  };

  // logique clickOutside du formulaire de recherche pour le fermer.
  // const handleClickOutside = (event: MouseEvent) => {
  //   if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node))
  //   {
  //     setIsAdvancedSearch(false); // ferme la div de recherche
  //   }
  // }


  // Logique de scroll to top.
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        // Scroll vers le bas
        setHidden(true);
      } else {
        // Scroll vers le haut
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`navbar ${hidden ? "hidden" : ""}`}>
      <nav className="navbar-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/home">Recherche</Link>
        </li>
        <li className="nav-item">
          <Link to="/ancestors">Ancêtres</Link>
        </li>
        <li className="nav-item">
          <Link to="/ancestors/new">Formulaire</Link>
        </li>
        {/* TODO : Implémenter un tri sur les lastnames[] et parcourir le tableau pour lister les familes */}
        {/* <li className="nav-item">
          <Link to="/families">Familles</Link>
        </li> */}
        <img
          src="../LogoTest2.png"
          alt="Logo"
          className="logo"
          onClick={() => navigate("/home")}
        />
        <button className="search-selector" onClick={toggleSearchMode}>
          {isAdvancedSearch ? "Recherche simple" : "Recherche avancée"}
        </button>
        <div>
          {isAdvancedSearch
            ? (

              <SearchBar onSearch={onSearch} />
          ) : (
            <SimpleSearchBar onSearch={onSearch} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
