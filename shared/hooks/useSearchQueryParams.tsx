import { useSearchParams, URLSearchParamsInit } from 'react-router-dom';

interface SearchValues {
  firstname: string;
  lastname: string;
  birthdate?: string;
  birthdateStart?: string;
  birthdateEnd?: string;
  deathDate?: string;
  deathDateStart?: string;
  deathDateEnd?: string;
}

export default function useSearchQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (newSearchValues: SearchValues) => {
    // Convertir les valeurs de SearchValues en Record<string, string> pour un typage correct.
    const newParams: Record<string, string> = {};
    Object.entries(newSearchValues).forEach(([key, value]) => {
      if (value !== undefined) {
        newParams[key] = value;
      }
    });
    setSearchParams(newParams as URLSearchParamsInit);
  };

  const getInitialSearchValues = (): SearchValues => {
    return {
      firstname: searchParams.get('firstname') || '',
      lastname: searchParams.get('lastname') || '',
      // Récupérer les autres paramètres de recherche à partir de l'URL
    };
  };

  return {
    updateSearchParams,
    getInitialSearchValues,
  };
}