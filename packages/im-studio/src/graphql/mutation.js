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

const CREATE_MOVIE = gql`
  mutation CreateMovie(
    $mid: ID!
    $guid: ID!
    $title: String!
    $description: String
    $url: String!
    $thumbnails: InputThumbnails
  ) {
    addMovie(
      mId: $mid
      guid: $guid
      title: $title
      description: $description
      url: $url
      thumbnails: $thumbnails
    ) {
      mId
      guid
      title
      description
      url
    }
  }
`;

export { CREATE_USER, CREATE_MOVIE };
