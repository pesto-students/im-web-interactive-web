import { gql } from "@apollo/client";

const QUERY_ALL_MOVIES = gql`
  query getAllMovies(
    $queryText: String
    $userId: String
    $isPublished: Boolean
    $isFeatured: Boolean
  ) {
    movies(
      userId: $userId
      isPublished: $isPublished
      isFeatured: $isFeatured
      queryText: $queryText
    ) {
      id
      mId
      name
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

const QUERY_MOVIE_ID = gql`
  query getMovieByID($id: ID!) {
    movie(id: $id) {
      id
      mId
      name
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

const NEW_RELEASES = gql`
  query {
    getNewReleases {
      id
      mId
      name
      title
      description
      url
      genre
      createdAt
      thumbnails {
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
    }
  }
`;

const FEATURED_MOVIES = gql`
  query {
    getFeatured {
      id
      mId
      name
      title
      description
      url
      genre
      createdAt
      thumbnails {
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
    }
  }
`;

const QUERY_INTERACTIVE_DATA_BY_MOVIE_ID = gql`
  query getInteractiveData($movieId: ID!) {
    getInteractiveData(movieId: $movieId) {
      overlayId
      overlayTemplate
      overlayName
      jumpPoint
      templateTitle
      templateLeftAction
      templateRightAction
      templateLeftLabel
      templateRightLabel
    }
  }
`;

const IS_WATCHLISTED = gql`
  query isWatchlisted($movieId: ID!, $userId: ID!) {
    isWatchlisted(movieId: $movieId, userId: $userId)
  }
`;

const GET_WATCHLISTED_MOVIES = gql`
  query getWatchlistedMovies($userId: ID!) {
    getWatchlistedMovies(userId: $userId) {
      id
      mId
      name
      title
      description
      url
      genre
      createdAt
      thumbnails {
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
    }
  }
`;

export {
  QUERY_ALL_MOVIES,
  QUERY_MOVIE_ID,
  NEW_RELEASES,
  FEATURED_MOVIES,
  QUERY_INTERACTIVE_DATA_BY_MOVIE_ID,
  IS_WATCHLISTED,
  GET_WATCHLISTED_MOVIES,
};
