import {
  ADD_MOVIE,
  GET_MOVIE_BY_ID,
  GET_MOVIE_SUCCESS,
  GET_ALL_MOVIES,
  GET_ALL_MOVIES_ERROR,
  GET_ALL_MOVIES_SUCCESS,
  UPDATE_MOVIE_BY_ID,
  ADD_ACTION,
  DELETE_ACTION,
} from "./types";

// Get Movies
export const getAllMovies = (userId) => ({
  type: GET_ALL_MOVIES,
  payload: { userId },
});

export const getMovieByID = (id) => ({
  type: GET_MOVIE_BY_ID,
  payload: { id },
});

export const getMovieSuccess = (data) => ({
  type: GET_MOVIE_SUCCESS,
  payload: data,
});

export const getAllMoviesSuccess = (data) => ({
  type: GET_ALL_MOVIES_SUCCESS,
  payload: data,
});

export const getAllMoviesError = (data) => ({
  type: GET_ALL_MOVIES_ERROR,
  payload: data,
});

export const addMovie = (options, history) => ({
  type: ADD_MOVIE,
  payload: { options, history },
});

export const updateMovieByID = (movie) => ({
  type: UPDATE_MOVIE_BY_ID,
  payload: movie,
});

// ACTIONS
export const addAction = (options, actionType) => ({
  type: ADD_ACTION,
  payload: { options, actionType },
});

export const deleteAction = (id, actionid, actionType) => ({
  type: DELETE_ACTION,
  payload: { id, actionid, actionType },
});
