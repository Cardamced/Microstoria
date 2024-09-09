import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
          <div className="navbar">
              
        <ul className="navbar-list" style={{ alignItems: "center", display: "flex" }}>
          <img src="../MicroLogo.png" alt="Logo" style={{ height: "auto", width: "55px", alignItems: "start", justifyItems: "center" }} />
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
        </ul>
      </div>
    </>
  );
}
