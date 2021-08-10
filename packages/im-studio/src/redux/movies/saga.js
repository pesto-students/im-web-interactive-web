import { all, takeEvery, call, put } from "redux-saga/effects";
import { gqlClient } from "imbase/graphql/gqlClient";
import { QUERY_ALL_MOVIES, QUERY_MOVIE_ID } from "../../graphql/queries";
import {
  CREATE_MOVIE,
  UPDATE_MOVIE_ID,
  CREATE_HOTSPOT,
  MUTATE_DELETE_HOTSPOT,
  CREATE_OVERLAY,
  MUTATE_DELETE_OVERLAY,
  CREATE_TRIGGER,
  MUTATE_DELETE_TRIGGER,
} from "../../graphql/mutation";
import {
  GET_ALL_MOVIES,
  ADD_MOVIE,
  GET_MOVIE_BY_ID,
  UPDATE_MOVIE_BY_ID,
  ADD_ACTION,
  DELETE_ACTION,
} from "./types";
import {
  getAllMoviesSuccess,
  getAllMoviesError,
  getMovieSuccess,
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

const addActionApi = (apiParams) => {
  return gqlClient.mutate(apiParams);
};
const deleteActionApi = (apiParams) => {
  return gqlClient.mutate(apiParams);
};

// Sagas Actions
function* addAction({ payload: { options, actionType } }) {
  let mutationParam;

  if (actionType === "HOTSPOT") {
    mutationParam = CREATE_HOTSPOT;
  } else if (actionType === "OVERLAY") {
    mutationParam = CREATE_OVERLAY;
  } else if (actionType === "TRIGGER") {
    mutationParam = CREATE_TRIGGER;
  }

  const apiParams = {
    mutation: mutationParam,
    variables: {
      mid: options.id,
      data: options.data,
    },
  };

  const { data } = yield call(addActionApi, apiParams);

  if (data) {
    yield call(getMovieByID, { payload: { id: options.id } });
  } else {
    // TODO  ADD SENTRY
  }
}

function* deleteAction({ payload }) {
  let mutationParam;

  if (payload.actionType === "HOTSPOT") {
    mutationParam = MUTATE_DELETE_HOTSPOT;
  } else if (payload.actionType === "OVERLAY") {
    mutationParam = MUTATE_DELETE_OVERLAY;
  } else if (payload.actionType === "TRIGGER") {
    mutationParam = MUTATE_DELETE_TRIGGER;
  }

  const apiParams = {
    mutation: mutationParam,
    variables: {
      id: payload.actionid,
      movieId: payload.id,
    },
  };

  const { data } = yield call(deleteActionApi, apiParams);
    if (data) {
      yield call(getMovieByID, { payload: { id: payload.id } });
    } else {
      // console.log(error);
      // TODO  ADD SENTRY 
    }
}

// Watcher Movie
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

// Watcher Action
function* initAddAction() {
  yield takeEvery(ADD_ACTION, addAction);
}
function* initDeleteAction() {
  yield takeEvery(DELETE_ACTION, deleteAction);
}

function* moviesSaga() {
  yield all([
    initGetAllMovies(),
    initAddMovie(),
    initGetMovieByID(),
    initUpdateMovieByID(),
    initAddAction(),
    initDeleteAction(),
  ]);
}

export default moviesSaga;
