import './App.css';
import AncestorsList from './AncestorsList';
import AncestorView from './AncestorView';
import { useState } from 'react';

export default function App() {
  const [selectedAncestorId, setSelectedAncestorId] = useState(null);

  const handleAncestorSelect = (id) => {
    setSelectedAncestorId(id);
  };

  return (
    <>
      <h1>Microstoria</h1>
      <AncestorsList onSelectAncestor={handleAncestorSelect} />
      {selectedAncestorId && <AncestorView ancestorId={selectedAncestorId} />}
    </>
  );
}