import React, { useReducer, PropsWithChildren } from 'react';
import Context from './context';
import Reducer from './reducer';
import axios from 'axios';

import { Actions, AppState, Movie } from './types';

interface SearchResult {
  results: Movie[];
  api_total_pages: number;
  app_total_pages: number;
}

function MovieState(props: PropsWithChildren<{}>) {
  const initialState: AppState = {
    movies: [],
    movie: undefined,
    loading: false,
    api_total_pages: 0,
    app_total_pages: 0,
    currentPage: 0,
    query: '',
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  // Search Movies
  async function searchMovies(text: string) {
    setLoading();

    try {
      const res = await axios.get(`/api/search?q=${text}&page=1`); // always first page

      const { results, api_total_pages, app_total_pages } = res.data;

      dispatch({
        type: Actions.SEARCH_MOVIES,
        payload: {
          movies: results,
          api_total_pages,
          app_total_pages,
          query: text,
        },
      });
    } catch (error) {
      // dispatch({
      //   type: SEARCH_MOVIES,
      //   payload: [],
      // });
    }
  }

  // Get Movie
  async function getMovie(id: number) {
    setLoading();
    try {
      const res = await axios.get(`movies/${id}`);

      dispatch({
        type: Actions.GET_MOVIE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: Actions.MOVIE_NOT_FOUND,
        payload: state,
      });
    }

    // setAlert(null);
  }

  async function setCurrentPage(p: number) {
    try {
      const res = await axios.get(
        `/api/search?q=${state.query}&page=${p}&api_total_pages=${state.api_total_pages}`
      );
      const { results }: SearchResult = res.data;
      dispatch({
        type: Actions.SET_CURRENT_PAGE,
        payload: {
          movies: results,
          currentPage: p,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  function clear() {
    dispatch({
      type: Actions.CLEAR,
      payload: initialState,
    });
  }
  // Set Loading
  function setLoading() {
    dispatch({
      type: Actions.SET_LOADING,
      payload: {
        movies: state.movies,
      },
    });
  }

  return (
    <Context.Provider
      value={{
        movies: state.movies,
        movie: state.movie,
        loading: state.loading,
        api_total_pages: state.api_total_pages,
        app_total_pages: state.app_total_pages,
        currentPage: state.currentPage,
        query: state.query,
        searchMovies,
        getMovie,
        setCurrentPage,
        clear,
        setLoading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default MovieState;
