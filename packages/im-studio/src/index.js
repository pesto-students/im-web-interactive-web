import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";

import dotenv from "dotenv";

import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ApolloProvider client={gqlClient}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
