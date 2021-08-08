import {
  ADD_MOVIE,
  GET_MOVIE_BY_ID,
  GET_MOVIE_SUCCESS,
  GET_ALL_MOVIES,
  GET_ALL_MOVIES_ERROR,
  GET_ALL_MOVIES_SUCCESS,
  UPDATE_MOVIE_BY_ID,
  ADD_HOTSPOT,
} from "./types";

// *********************************
// Get Movies
// *********************************

export const getAllMovies = (userid) => ({
  type: GET_ALL_MOVIES,
  payload: { userid },
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

// *********************************
// Add Movie
// *********************************
export const addMovie = (options, history) => ({
  type: ADD_MOVIE,
  payload: { options, history },
});

// *********************************
// Update Movie
// *********************************
export const updateMovieByID = (movie) => ({
  type: UPDATE_MOVIE_BY_ID,
  payload: movie,
});


// *********************************
// Add Hotspot
// *********************************
export const addHotspot = (options) => ({
  type: ADD_HOTSPOT,
  payload: { options },
});