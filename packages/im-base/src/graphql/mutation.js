import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser(
    $uid: ID!
    $displayName: String!
    $email: String!
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
    $editorId: ID!
    $title: String!
    $description: String
    $url: String!
    $thumbnails: InputThumbnails
  ) {
    addMovie(
      mId: $mid
      editorId: $editorId
      title: $title
      description: $description
      url: $url
      thumbnails: $thumbnails
    ) {
      id
    }
  }
`;

const UPDATE_MOVIE_ID = gql`
  mutation UpdateMovieByID($id: String!, $data: InputMovie!) {
    updateMovie(id: $id, data: $data) {
      id
      mId
      title
      description
      url
      thumbnails {
        default {
          url
          width
          height
        }
        standard {
          url
          width
          height
        }
        medium {
          url
          width
          height
        }
        high {
          url
          width
          height
        }
        maxres {
          url
          width
          height
        }
      }
      genre
      rating
      createdAt
      publishedAt
      isPublished
      editorId
      isFeatured
      watchlistedUsers
      comments {
        userId
        data
        rating
      }
      hotspots
      overlays
      triggers
      interactiveData
    }
  }
`;

const CREATE_HOTSPOT = gql`
  mutation CREATE_HOTSPOT($mid: ID!, $data: InputHotspot!) {
    addHotspot(movieId: $mid, data: $data) {
      id
    }
  }
`;

const MUTATE_DELETE_HOTSPOT = gql`
  mutation DELETE_HOTSPOT($movieId: ID!, $id: ID!) {
    deleteHotspot(movieId: $movieId, id: $id)
  }
`;

const CREATE_OVERLAY = gql`
  mutation CREATE_OVERLAY($mid: ID!, $data: InputOverlay!) {
    addOverlay(movieId: $mid, data: $data) {
      id
    }
  }
`;

const MUTATE_DELETE_OVERLAY = gql`
  mutation DELETE_OVERLAY($movieId: ID!, $id: ID!) {
    deleteOverlay(movieId: $movieId, id: $id)
  }
`;

const CREATE_TRIGGER = gql`
  mutation CREATE_TRIGGER($mid: ID!, $data: InputTrigger!) {
    addTrigger(movieId: $mid, data: $data) {
      id
    }
  }
`;

const MUTATE_DELETE_TRIGGER = gql`
  mutation DELETE_TRIGGER($movieId: ID!, $id: ID!) {
    deleteTrigger(movieId: $movieId, id: $id)
  }
`;

const MUTATION_ADD_WATCHLIST = gql`
  mutation ADD_WATCHLIST($movieId: ID!, $userid: ID!) {
    addToWatchlist(movieId: $movieId, userId: $userid)
  }
`;

const MUTATION_DELETE_WATCHLIST = gql`
  mutation DELETE_WATCHLIST($movieId: ID!, $userid: ID!) {
    deleteFromWatchlist(movieId: $movieId, userId: $userid)
  }
`;

const MUTATE_DELETE_MOVIE = gql`
  mutation DELETE_MOVIE($movieId: ID!) {
    deleteMovie(movieId: $movieId) {
      id
      title
      mId
    }
  }
`;

export {
  CREATE_USER,
  CREATE_MOVIE,
  UPDATE_MOVIE_ID,
  CREATE_HOTSPOT,
  MUTATE_DELETE_HOTSPOT,
  CREATE_OVERLAY,
  MUTATE_DELETE_OVERLAY,
  CREATE_TRIGGER,
  MUTATE_DELETE_TRIGGER,
  MUTATION_ADD_WATCHLIST,
  MUTATION_DELETE_WATCHLIST,
  MUTATE_DELETE_MOVIE,
};
