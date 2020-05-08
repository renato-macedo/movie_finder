import {
  SEARCH_MOVIES,
  SET_LOADING,
  GET_MOVIE,
  MOVIE_NOT_FOUND,
  SET_CURRENT_PAGE,
  CLEAR,
} from './types';

export default function (state, action) {
  switch (action.type) {
    case SEARCH_MOVIES:
      return {
        ...state,
        movies: action.payload.movies,
        api_total_pages: action.payload.api_total_pages,
        app_total_pages: action.payload.app_total_pages,
        currentPage: 1,
        query: action.payload.query,
        loading: false,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        movies: action.payload.movies,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR:
      return action.payload;
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    case MOVIE_NOT_FOUND:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
