import { ApolloClient, InMemoryCache } from "@apollo/client";

// apollo-client graphql initialization
const gqlClient = new ApolloClient({
  uri:
    process.env.REACT_APP_NODE_ENV !== "development"
      ? process.env.REACT_APP_GRAPH_PROD_API
      : process.env.REACT_APP_GRAPH_DEV_API,
  cache: new InMemoryCache(),
});

export { gqlClient };
