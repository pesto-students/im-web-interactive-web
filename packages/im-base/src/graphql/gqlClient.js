import { ApolloClient, InMemoryCache } from "@apollo/client";

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
// apollo-client graphql initialization
const gqlClient = new ApolloClient({
  uri:
    process.env.REACT_APP_NODE_ENV !== "development"
      ? process.env.REACT_APP_GRAPH_PROD_API
      : process.env.REACT_APP_GRAPH_DEV_API,
  cache: new InMemoryCache({ addTypename: false }),
  defaultOptions: defaultOptions,
});

export { gqlClient };
