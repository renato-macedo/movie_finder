import React, { useReducer } from 'react';
import Context from './context';
import Reducer from './reducer';
import axios from 'axios';

import {
  SEARCH_MOVIES,
  SET_LOADING,
  CLEAR_MOVIES,
  GET_MOVIE,
  MOVIE_NOT_FOUND,
  SET_CURRENT_PAGE,
} from './types';

function MovieState(props) {
  const initialState = {
    movies: [],
    movie: {},
    loading: false,
    total_pages: 0,
    currentPage: 0,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  // Search Movies
  async function searchMovies(text) {
    setLoading();

    try {
      const res = await axios.get(`/api/movies?search=${text}`);

      console.log(res.data);
      const { results, total_pages } = res.data;
      dispatch({
        type: SEARCH_MOVIES,
        payload: { movies: results, total_pages },
      });
    } catch (error) {
      dispatch({
        type: SEARCH_MOVIES,
        payload: [],
      });
    }
  }

  // Get Movie
  async function getMovie(id) {
    setLoading();
    try {
      const res = await axios.get(`movies/${id}`);
      console.log(res.data);
      dispatch({
        type: GET_MOVIE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: MOVIE_NOT_FOUND,
        payload: { vote_average: '-', imdb_id: '' },
      });
    }

    // setAlert(null);
  }

  function setCurrentPage(p) {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: p,
    });
  }

  // Clear Movies
  function clearMovies() {
    dispatch({
      type: CLEAR_MOVIES,
    });
  }

  // Set Loading
  function setLoading() {
    return dispatch({ type: SET_LOADING });
  }

  return (
    <Context.Provider
      value={{
        movies: state.movies,
        movie: state.movie,
        loading: state.loading,
        searchMovies,
        clearMovies,
        getMovie,
        setCurrentPage,
        total_pages: state.total_pages,
        currentPage: state.currentPage,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default MovieState;
