// import { useState, useEffect } from 'react';

// const API_URL = 'http://localhost:5173/ancestors'; // Remplacez par votre URL d'API

// interface Ancestor {
//   id: number;
//   firstname: string;
//   lastname: string;
// }

// interface UseAncestorSearchResult {
//   ancestors: Ancestor[];
//   hasMore: boolean;
//   count: number;
//   isLoading: boolean;
//   fetchAllAncestors: (params: { searchValue: string; signal: AbortSignal; pageNumber: number }) => void;
//   page: number;
//   setPage: React.Dispatch<React.SetStateAction<number>>;
// }

// const useAncestorSearch = ({ searchValue }: { searchValue: string }): UseAncestorSearchResult => {
//   const [ancestors, setAncestors] = useState<Ancestor[]>([]);
//   const [filteredAncestors, setFilteredAncestors] = useState<Ancestor[]>([]);
//   const [hasMore, setHasMore] = useState(false);
//   const [count, setCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   const fetchAllAncestors = async ({ searchValue, signal, pageNumber }: { searchValue: string; signal: AbortSignal; pageNumber: number }) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${API_URL}?page=${pageNumber}`, { signal });
//       const data = await response.json();
//       setAncestors((prevAncestors) => [...prevAncestors, ...data.results]);
//       setHasMore(data.next !== null);
//       setCount(data.count);
//     } catch (error : any) {
//       if (error.name !== 'AbortError') {
//         console.error('Failed to fetch ancestors:', error);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     fetchAllAncestors({ searchValue, signal, pageNumber: 1 });

//     return () => controller.abort();
//   }, [searchValue]);

//   useEffect(() => {
//     if (searchValue) {
//       const filtered = ancestors.filter(
//         (ancestor) =>
//           ancestor.firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
//           ancestor.lastname.toLowerCase().includes(searchValue.toLowerCase())
//       );
//       setFilteredAncestors(filtered);
//     } else {
//       setFilteredAncestors(ancestors);
//     }
//   }, [ancestors, searchValue]);

//   return { ancestors: filteredAncestors, hasMore, count, isLoading, fetchAllAncestors, page, setPage };
// };

// export default useAncestorSearch;