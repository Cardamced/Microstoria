import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function App() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/home");
  };

  // TODO : onclick sur la page pour aller sur la homepage.
  return (
    <>
      <img src="./LogoTest.png" alt="Logo" className="main-logo" onClick={onClick} />
    </>
  );
}