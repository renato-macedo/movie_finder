// constants
const API_KEY = '1bdce766d954223068eacafe6c05c383'; // I dont need to put in a env file
const BASE_URL = `https://api.themoviedb.org/3`;

export function getSearchURL(query: string, page: string) {
  return `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=pt-BR`;
}

export function getMovieURL(movieID: string) {
  return `${BASE_URL}/movie/${movieID}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`;
}

export function getFindGenreURL(genreID: string, page: string) {
  return `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreID}`;
}
