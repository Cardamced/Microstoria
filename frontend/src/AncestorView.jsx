import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import the prop-types library
import { getAncestorsById } from './api-fetch-ancestors';

export default function AncestorView({ ancestorId }) {
    const [ancestor, setAncestor] = useState(null); // Utilisation de l'état pour stocker les ancêtres
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAncestorById = async () => {
            console.log('coucou');
            try {
                const data = await getAncestorsById(ancestorId);
                setAncestor(data);
                console.log('Fetched ancestor', data);
            } catch (error) {
                setError(error);
            }
        }

        fetchAncestorById();
    }, [ancestorId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Vue de l&apos;ancêtre</h2>
            {ancestor} ? (
            <div>
                {ancestor.firstname} {ancestor.lastname}
                <p>Sexe: {ancestor.gender}</p>
                <p>Date de naissance: {ancestor.birthdate}</p>
                <p>Lieu de naissance: {ancestor.birth_place}</p>
                <p>Date de mariage: {ancestor.wedding_date}</p>
                <p>Lieu de mariage: {ancestor.wedding_place}</p>
                <p>Date de décès: {ancestor.death_date}</p>
                <p>Lieu de décès: {ancestor.death_place}</p>
                <p>Occupation: {ancestor.occupation}</p>
                <p>Sosa: {ancestor.sosa}</p>
            </div>
            ) : (
            <p>Aucun ancêtre trouvé.</p>
            )
        </div >
    );
}

// Add prop validation for ancestorId
AncestorView.propTypes = {
    ancestorId: PropTypes.string.isRequired,
};