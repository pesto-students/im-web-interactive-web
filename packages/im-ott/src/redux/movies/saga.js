import { all, takeEvery, call, put } from "redux-saga/effects";
import { gqlClient } from "../../graphql/client";
import { HELLO_WORLD } from "../../graphql/queries";
import { FETCH_MOVIES } from "./types";
import { fetchMoviesSuccess, fetchMoviesError } from "./actions";

// Apollo Client
const getMoviesFromApi = () => {
  return gqlClient
    .query({
      query: HELLO_WORLD,
    })
    .then((res) => res);
};

function* getMovies() {
  const { loading, error, data } = yield call(getMoviesFromApi);
  if (data) {
    console.log(data);
    yield put(fetchMoviesSuccess(data));
  } else {
    yield put(fetchMoviesError(error));
  }
}

function* initGetMovies() {
  yield takeEvery(FETCH_MOVIES, getMovies);
}

function* moviesSaga() {
  yield all([initGetMovies()]);
}

export default moviesSaga;
