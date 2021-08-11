import { all, takeEvery, call, put } from "redux-saga/effects";
import { gqlClient } from "imbase/graphql/gqlClient";
import { NEW_RELEASES } from "../../graphql/queries";
import { FETCH_MOVIES } from "./types";
import { fetchMoviesSuccess, fetchMoviesError } from "./actions";

// Apollo Client
const getMoviesFromApi = () => {
  return gqlClient
    .query({
      query: NEW_RELEASES,
    })
    .then((res) => res);
};

function* getMovies() {
  const { error, data } = yield call(getMoviesFromApi);
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
