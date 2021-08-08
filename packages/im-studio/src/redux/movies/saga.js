import { all, takeEvery, call, put, fork } from "redux-saga/effects";
import { gqlClient } from "imbase/graphql/gqlClient";
import { QUERY_ALL_MOVIES, QUERY_MOVIE_ID } from "../../graphql/queries";
import {
  CREATE_MOVIE,
  UPDATE_MOVIE_ID,
  CREATE_HOTSPOT,
} from "../../graphql/mutation";
import {
  GET_ALL_MOVIES,
  ADD_MOVIE,
  GET_MOVIE_BY_ID,
  UPDATE_MOVIE_BY_ID,
  ADD_HOTSPOT,
} from "./types";
import {
  getAllMoviesSuccess,
  getAllMoviesError,
  getMovieSuccess,
  getMovieByID as getMovieByIDAction,
} from "./actions";
import { getCurrentUser } from "imbase/services/firebase";

// Toaster
import { toast } from "imcomponents/atoms/toaster";

//Reader
import YoutubeReader from "imbase/readers/YoutubeVideo";

// Apollo Client Queries
const getAllMoviesFromApi = () => {
  return gqlClient
    .query({
      query: QUERY_ALL_MOVIES,
    })
    .then((res) => res);
};

const addMovieApi = (options) => {
  return gqlClient.mutate({
    mutation: CREATE_MOVIE,
    variables: {
      editorId: getCurrentUser().uid,
      mid: YoutubeReader.id(options),
      title: YoutubeReader.title(options),
      description: YoutubeReader.description(options),
      url: `http://www.youtube.com/watch?v=${YoutubeReader.id(options)}`,
      thumbnails: YoutubeReader.thumbnails(options),
    },
  });
};

const getMovieByIDApi = ({ id }) => {
  return gqlClient
    .query({
      query: QUERY_MOVIE_ID,
      variables: {
        id: id,
      },
    })
    .then((res) => res);
};

const updateMovieByIDApi = (movie) => {
  let updateData = { ...movie };
  return gqlClient
    .mutate({
      mutation: UPDATE_MOVIE_ID,
      variables: {
        id: movie.id,
        data: updateData,
      },
    })
    .then((res) => res);
};

// Hotspot APi
const addHotspotApi = ({ id, data }) => {
  return gqlClient.mutate({
    mutation: CREATE_HOTSPOT,
    variables: {
      mid: id,
      data: data,
    },
  });
};

// Sagas Movies
function* getAllMovies() {
  const { error, data } = yield call(getAllMoviesFromApi);
  if (data) {
    yield put(getAllMoviesSuccess(data.movies));
  } else {
    yield put(getAllMoviesError(error));
  }
}

function* addMovie({ payload: { history, options } }) {
  const { error, data } = yield call(addMovieApi, options);
  if (data) {
    const { addMovie } = data;
    history.push(`/video/${addMovie.id}/edit`);
  } else {
    console.log(error);
  }
}

function* getMovieByID({ payload }) {
  console.log("getmoviebyid", payload);
  const { error, data } = yield call(getMovieByIDApi, payload);
  console.log(data);
  if (data) {
    console.log("getmoviebydata", data);
    yield put(getMovieSuccess(data));
  } else {
    yield put(getAllMoviesError(error));
  }
}

function* updateMovieByID({ payload }) {
  const { error, data } = yield call(updateMovieByIDApi, payload);
  if (data) {
    let payload = { movie: data.updateMovie };
    yield put(getMovieSuccess(payload));
    toast.success("Movie Update Successful");
  } else {
    yield put(getAllMoviesError(error));
  }
}

// Sagas HotSpots
function* addHotspot({ payload: { options } }) {
  const { error, data } = yield call(addHotspotApi, options);
  console.log(data);
  console.log(new Date());
  if (data) {
    console.log("fafadfa");
    console.log(new Date());
    const response = yield call(getMovieByIDApi, { id: options.id });
    console.log(new Date());
    console.log("11111", response);
  } else {
    console.log(error);
  }
}

// Watchers
function* initGetAllMovies() {
  yield takeEvery(GET_ALL_MOVIES, getAllMovies);
}

function* initGetMovieByID() {
  yield takeEvery(GET_MOVIE_BY_ID, getMovieByID);
}

function* initUpdateMovieByID() {
  yield takeEvery(UPDATE_MOVIE_BY_ID, updateMovieByID);
}

function* initAddMovie() {
  yield takeEvery(ADD_MOVIE, addMovie);
}

// Watcher Hotspot
function* initAddHotspot() {
  yield takeEvery(ADD_HOTSPOT, addHotspot);
}

function* moviesSaga() {
  yield all([
    fork(initGetAllMovies),
    fork(initAddMovie),
    fork(initGetMovieByID),
    fork(initUpdateMovieByID),
    fork(initAddHotspot),
  ]);
}

export default moviesSaga;
