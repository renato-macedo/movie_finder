import { Actions, AppState, Movie, MovieDetail } from './types';
import { Reducer } from 'react';

export interface Action {
  type: string;
  payload: {
    movies: Movie[];
    api_total_pages?: number;
    app_total_pages?: number;
    query?: string;
    currentPage?: number;
    movie?: MovieDetail;
  };
}

const reducer: Reducer<AppState, Action> = (state, action): AppState => {
  switch (action.type) {
    case Actions.SEARCH_MOVIES:
      const { api_total_pages, app_total_pages, query } = action.payload;
      return {
        ...state,
        movies: action.payload.movies,
        api_total_pages: api_total_pages ? api_total_pages : 0,
        app_total_pages: app_total_pages ? app_total_pages : 0,
        currentPage: 1,
        query: query ? query : '',
        loading: false,
      };
    case Actions.SET_CURRENT_PAGE:
      const { currentPage } = action.payload;
      return {
        ...state,
        currentPage: currentPage ? currentPage : 0,
        movies: action.payload.movies,
      };
    case Actions.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Actions.CLEAR:
      return {
        api_total_pages: 0,
        app_total_pages: 0,
        currentPage: 0,
        loading: false,
        movies: [],
        query: '',
      };
    case Actions.GET_MOVIE:
      return {
        ...state,
        movie: action.payload.movie,
        loading: false,
      };
    case Actions.MOVIE_NOT_FOUND:
      return {
        ...state,
        movie: action.payload.movie,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
