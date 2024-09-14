import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SimpleSearchBar from "./Search/SimpleSearchBar";
import SearchBar from "./Search/SearchBar";
import "./Navbar.css";

interface NavbarProps {
  onSearch: (values: {
    firstname: string;
    lastname: string;
    birthdate?: string;
    birthdateStart?: string;
    birthdateEnd?: string;
    deathDate?: string;
  }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const navigate = useNavigate();

  const toggleSearchMode = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

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
      <img
        src="../LogoTest2.png"
        alt="Logo"
        className="logo"
        onClick={() => navigate("/home")}
      />
      <button className="search-selector" onClick={toggleSearchMode}>
        {isAdvancedSearch ? "Recherche simple" : "Recherche avancée"}
      </button>
      {isAdvancedSearch ? (
        <SearchBar onSearch={onSearch} />
      ) : (
        <SimpleSearchBar onSearch={onSearch} />
      )}
      <nav className="navbar-list">
        <li className="nav-item">
          <Link to="/">Entrée</Link>
        </li>
        <li className="nav-item">
          <Link to="/home">Accueil</Link>
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
      </nav>
    </div>
  );
};

export default Navbar;