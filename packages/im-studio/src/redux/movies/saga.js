import { all, takeEvery, call, put } from "redux-saga/effects";
import { gqlClient } from "imbase/graphql/gqlClient";
import { HELLO_WORLD } from "../../graphql/queries";
import { CREATE_MOVIE } from "../../graphql/mutation";
import { FETCH_MOVIES, ADD_MOVIE } from "./types";
import { fetchMoviesSuccess, fetchMoviesError } from "./actions";
import { getCurrentUser } from "imbase/services/firebase";

//Reader
import YoutubeReader from "imbase/readers/YoutubeVideo";

// Apollo Client
const getMoviesFromApi = () => {
  return gqlClient
    .query({
      query: HELLO_WORLD,
    })
    .then((res) => res);
};
const addMovieApi = ({ options, history }) => {
  return gqlClient.mutate({
    mutation: CREATE_MOVIE,
    variables: {
      guid: getCurrentUser().uid,
      mid: YoutubeReader.id(options),
      title: YoutubeReader.title(options),
      description: YoutubeReader.description(options),
      url: `http://www.youtube.com/watch?v=${YoutubeReader.id(options)}`,
      thumbnails: YoutubeReader.thumbnails(options),
    },
  });
};

function* getMovies() {
  const { error, data } = yield call(getMoviesFromApi);
  if (data) {
    yield put(fetchMoviesSuccess(data));
  } else {
    yield put(fetchMoviesError(error));
  }
}

function* addMovie({ payload }) {
  const { error, data } = yield call(addMovieApi, payload);
  console.log(error);
  console.log(data);
}

function* initGetMovies() {
  yield takeEvery(FETCH_MOVIES, getMovies);
}

function* initAddMovie() {
  yield takeEvery(ADD_MOVIE, addMovie);
}

function* moviesSaga() {
  yield all([initGetMovies(), initAddMovie()]);
}

export default moviesSaga;
