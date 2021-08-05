import {
  FETCH_MOVIES,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIES_SUCCESS,
} from "./types";

// *********************************
// Fetch Movies
// *********************************

export const fetchMovies = () => ({
  type: FETCH_MOVIES,
  payload: null,
});

export const fetchMoviesSuccess = (data) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: data,
});

export const fetchMoviesError = (data) => ({
  type: FETCH_MOVIES_ERROR,
  payload: data,
});
