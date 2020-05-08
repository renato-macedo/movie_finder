import React, { useReducer } from 'react';
import Context from './context';
import Reducer from './reducer';
import axios from 'axios';

import {
  SEARCH_MOVIES,
  SET_LOADING,
  GET_MOVIE,
  MOVIE_NOT_FOUND,
  SET_CURRENT_PAGE,
  CLEAR,
} from './types';

function MovieState(props) {
  const initialState = {
    movies: [],
    movie: {},
    loading: false,
    api_total_pages: 0,
    app_total_pages: 0,
    currentPage: 0,
    query: '',
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  // Search Movies
  async function searchMovies(text) {
    setLoading();

    try {
      const res = await axios.get(`/api/search?q=${text}&page=1`); // always first page

      console.log(res.data);
      const { results, api_total_pages, app_total_pages } = res.data;
      console.log(text);
      dispatch({
        type: SEARCH_MOVIES,
        payload: {
          movies: results,
          api_total_pages,
          app_total_pages,
          query: text,
        },
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

  async function setCurrentPage(p) {
    try {
      console.log(state);
      const res = await axios.get(
        `/api/search?q=${state.query}&page=${p}&api_total_pages=${state.api_total_pages}`
      );
      const { results } = res.data;
      dispatch({
        type: SET_CURRENT_PAGE,
        payload: { movies: results, currentPage: p },
      });
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: SEARCH_MOVIES,
      //   payload: [],
      // });
    }
  }
  function clear() {
    dispatch({
      type: CLEAR,
      payload: initialState,
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
        api_total_pages: state.api_total_pages,
        total_pages: state.app_total_pages,
        currentPage: state.currentPage,
        searchMovies,
        getMovie,
        setCurrentPage,
        clear,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default MovieState;
