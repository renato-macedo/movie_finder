import { createContext } from 'react';
import { AppContext } from './types';

const movieContext = createContext<AppContext>({
  api_total_pages: 0,
  app_total_pages: 0,
  clear: () => {},
  currentPage: 0,
  getMovie: () => {},
  loading: false,
  movies: [],
  query: '',
  searchType: 'filme',
  genreID: '',
  searchMovies: () => {},
  searchByGenre: () => {},
  setCurrentPage: () => {},
  setLoading: () => {},
  setSearchType: () => {},
});

export default movieContext;
