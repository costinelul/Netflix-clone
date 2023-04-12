export const API_KEY = "8ea7d1ee3125b40af423f2e171e72a60";
const BASE_URL = "https://api.themoviedb.org/3";
const genres = [
    { name: "Trending", request: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}` },
    { name: "Discover", request: `${BASE_URL}/discover/movie?api_key=${API_KEY}` },
];


export default genres;
