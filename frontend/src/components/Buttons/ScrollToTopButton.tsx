import React, { useEffect, useState } from "react";
import "./ScrollToTopButton.css"; // Assurez-vous de créer un fichier CSS pour le style

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

    
// Fonction qui change l'état du scroll si le scroll est supérieur à 300 pixels
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

// Fonction qui ramène le scroll à 0 pixels
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Rappel : peut être "auto", "smooth" ou "instant"
    });
  };
    
// UseEffect qui ajoute/supprime l'élément du DOM.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;