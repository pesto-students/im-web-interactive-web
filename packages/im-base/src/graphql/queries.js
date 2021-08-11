import { gql } from "@apollo/client";

const QUERY_ALL_MOVIES = gql`
  query {
    movies {
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
    filterMovies(filter: { key: "isPublished", value: "true" }) {
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

export { QUERY_ALL_MOVIES, QUERY_MOVIE_ID, NEW_RELEASES };
