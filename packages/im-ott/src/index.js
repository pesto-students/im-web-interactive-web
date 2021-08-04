import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Sentry Error Logging
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

// graphql
import { gqlClient } from "./graphql/client";

import dotenv from "dotenv";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

dotenv.config();

// Sentry Logging Initialization
if (process.env.REACT_APP_NODE_ENV !== "development") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    environment: process.env.REACT_APP_NODE_ENV,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

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
