import {
  FETCH_MOVIES,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIES_SUCCESS,
} from "./types";

const INIT_STATE = {
  movies: {},
};

const MoviesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return { ...state, loading: true };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_MOVIES_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default MoviesReducer;
