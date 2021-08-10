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

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

const INIT_STATE = {
  movies: EMPTY_OBJECT,
  movie: EMPTY_OBJECT,
};

const MoviesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_MOVIE:
      return { ...state, ...action.payload, loading: true };
    case GET_MOVIE_BY_ID:
      return { ...state, ...action.payload, loading: true };
    case UPDATE_MOVIE_BY_ID:
      return { ...state, ...action.payload, loading: true };
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        movie: action.payload.movie,
        loading: false,
        error: null,
      };
    case GET_ALL_MOVIES:
      return { ...state, loading: true, ...action.payload };
    case GET_ALL_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_MOVIES_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ADD_ACTION:
      return { ...state, ...action.payload, loading: true };
    case DELETE_ACTION:
      return { ...state, ...action.payload, loading: true };
    default:
      return { ...state };
  }
};

export default MoviesReducer;
