// const API_URL = 'http://localhost:5173/ancestors'; // Remplacez par votre URL d'API

// const fetchData = async (url: string, signal: AbortSignal) => {
//   try {
//     const response = await fetch(url, { signal });
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Network Error !');
//     }
//   } catch (error) {
//     throw new Error(`Unable to load API : ${error}`);
//   }
// };

// export const fetchAncestors = async ({
//   parameter,
//   setter,
//   setLoaded,
//   signal,
//   queryString = null,
// }: {
//   parameter: string;
//   setter: React.Dispatch<React.SetStateAction<any>>;
//   setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
//   signal: AbortSignal;
//   queryString?: string | null;
// }) => {
//   let url = `${API_URL}${parameter}`;

//   if (queryString) {
//     url += `?${queryString}`;
//   }
//   try {
//     const data = await fetchData(url, signal);
//     setLoaded(true);
//     setter(data);
//   } catch (error) {
//     throw new Error(`Unable to load ancestor list : ${error}`);
//   }
// };