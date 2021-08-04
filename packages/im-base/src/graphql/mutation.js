import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser(
    $uid: String
    $displayName: String
    $email: String
    $photoURL: String
    $emailVerified: Boolean
  ) {
    createUser(
      uid: $uid
      displayName: $displayName
      email: $email
      photoURL: $photoURL
      emailVerified: $emailVerified
    ) {
      uid
      displayName
      email
      photoURL
      emailVerified
    }
  }
`;

export { CREATE_USER };
