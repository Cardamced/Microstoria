import { useState, useEffect } from 'react';
import { getAncestors } from './api-fetch-ancestors';
import './AncestorsList.css';

import PropTypes from 'prop-types';

export default function AncestorsList({ onSelectedAncestor }) {
AncestorsList.propTypes = {
  onSelectedAncestor: PropTypes.func.isRequired,
};
    const [ancestors, setAncestors] = useState([]); // Utilisation de l'état pour stocker les ancêtres
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAncestors() {
            try {
                const data = await getAncestors();
                setAncestors(data);
            } catch (error) {
                setError(error);
            }
        }

        fetchAncestors();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Liste des ancêtres</h2>
            <ul>
                {ancestors.length > 0 ? (
                    ancestors.map((ancestor) => (
                        <li key={ancestor.id} onClick={() => onSelectedAncestor(ancestor.id) }>
                            {ancestor.firstname} {ancestor.lastname}
                            <p>Sexe: {ancestor.gender}</p>
                            <p>Date de naissance: {ancestor.birthdate}</p>
                            <p>Lieu de naissance: {ancestor.birth_place}</p>
                        </li>
                    ))
                ) : (
                    <p>Aucun ancêtre trouvé.</p>
                )}
            </ul>
        </div>
    );
}