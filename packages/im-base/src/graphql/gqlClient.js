import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// Sentry
import * as Sentry from "@sentry/react";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const httpLink = new HttpLink({
  uri:
    process.env.REACT_APP_NODE_ENV !== "development"
      ? process.env.REACT_APP_GRAPH_PROD_API
      : process.env.REACT_APP_GRAPH_DEV_API,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      Sentry.captureMessage(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

  if (networkError) {
    Sentry.captureMessage(`[Network error]: ${networkError}`);
    Sentry.captureException(networkError);
  }
});

// apollo-client graphql initialization
const gqlClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({ addTypename: false }),
  defaultOptions: defaultOptions,
});

export { gqlClient };
