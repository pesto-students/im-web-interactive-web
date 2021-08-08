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

const INIT_STATE = {
  movies: {},
  movie: {},
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
      console.log("GET_MOVIE_SUCCESS", action.payload);
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
    case ADD_HOTSPOT:
      return { ...state, ...action.payload, loading: true };
    default:
      return { ...state };
  }
};

export default MoviesReducer;
