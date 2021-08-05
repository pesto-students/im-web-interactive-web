import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
// redux sagas is a middleware that we apply to the store
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

export default store;
