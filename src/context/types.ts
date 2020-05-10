export enum Actions {
  SEARCH_MOVIES = 'SEARCH_MOVIES',
  GET_MOVIE = 'GET_MOVIE',
  SET_LOADING = 'SET_LOADING',
  SET_ALERT = 'SET_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
  MOVIE_NOT_FOUND = 'MOVIE_NOT_FOUND',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  CLEAR = 'CLEAR',
  SEARCH_MOVIES_ERROR = 'SEARCH_MOVIES_ERROR',
  SET_SEARCH_TYPE = 'SET_SEARCH_TYPE',
}

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
  vote_average: number;
  release_date: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  poster_path: string;
}

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  status: string;
  revenue: string;
  budget: string;
  videos: {
    results: { key: string; name: string; site: string; id: string }[];
  };
}

export interface AppState {
  movies: Movie[];
  movie?: MovieDetail;
  loading: boolean;
  api_total_pages: number;
  app_total_pages: number;
  currentPage: number;
  query: string;
  searchType: string;
  genreID?: string;
}

export interface AppContext extends AppState {
  searchMovies(text: string): void;
  searchByGenre(genreID: string, text: string): void;
  getMovie(id: number): void;
  setCurrentPage(pageNumber: number): void;
  clear(): void;
  setLoading(): void;
  setSearchType(searchType: string): void;
}
