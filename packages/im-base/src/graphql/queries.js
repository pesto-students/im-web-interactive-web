import { gql } from "@apollo/client";

const QUERY_ALL_MOVIES = gql`
  query getAllMovies(
    $userId: String
    $isPublished: Boolean
    $isFeatured: Boolean
  ) {
    movies(
      userId: $userId
      isPublished: $isPublished
      isFeatured: $isFeatured
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

export { QUERY_ALL_MOVIES, QUERY_MOVIE_ID, NEW_RELEASES, FEATURED_MOVIES };
