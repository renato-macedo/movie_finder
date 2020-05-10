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
    loading: false,
    api_total_pages: 0,
    app_total_pages: 0,
    currentPage: 0,
    query: '',
    searchType: 'filme',
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  // Search Movies
  async function searchMovies(text: string) {
    try {
      const res = await axios.get(`/api/search?q=${text}&page=1`); // always first page
      setMovies(res.data, text);
    } catch (error) {
      dispatch({
        type: Actions.SEARCH_MOVIES_ERROR,
        payload: initialState,
      });
    }
  }

  async function searchByGenre(genreID: string, text: string) {
    setSearchType('genero', genreID);
    try {
      const res = await axios.get(`/api/discover?genre=${genreID}&page=1`); // always first page
      setMovies(res.data, text, genreID);
    } catch (error) {
      dispatch({
        type: Actions.SEARCH_MOVIES_ERROR,
        payload: initialState,
      });
    }
  }

  function setMovies(data: SearchResult, query: string, genreID?: string) {
    const { results, api_total_pages, app_total_pages } = data;

    dispatch({
      type: Actions.SEARCH_MOVIES,
      payload: {
        movies: results,
        api_total_pages,
        app_total_pages,
        query,
        genreID,
      },
    });
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
      let res;

      if (state.searchType === 'genero') {
        res = await axios.get(
          `/api/discover?genre=${state.genreID}&page=${p}&api_total_pages=${state.api_total_pages}`
        );
      } else {
        res = await axios.get(
          `/api/search?q=${state.query}&page=${p}&api_total_pages=${state.api_total_pages}`
        );
      }
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
  function setSearchType(searchType: string, genreID?: string) {
    if (searchType === state.searchType) return;

    if (searchType === 'filme' || searchType === 'genero') {
      dispatch({
        type: Actions.SET_SEARCH_TYPE,
        payload: {
          movies: [],
          searchType: searchType,
          genreID,
        },
      });
    } else {
      throw new Error('Invalid Search Type');
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
        searchType: state.searchType,
        query: state.query,
        searchMovies,
        searchByGenre,
        getMovie,
        setCurrentPage,
        setSearchType,
        genreID: state.genreID,
        clear,
        setLoading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default MovieState;
