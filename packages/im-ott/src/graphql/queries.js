import { gql } from "@apollo/client";

const HELLO_WORLD = gql`
  query {
    hello
  }
`;

export { HELLO_WORLD };
