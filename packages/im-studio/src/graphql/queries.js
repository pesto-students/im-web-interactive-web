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
      hotspots {
        id
        name
        startPoint
      }
      overlays {
        id
        name
        jumpPoint
        templateActionId
      }
      templateActions {
        id
        title
        leftHotspotId
        rightHotspotId
      }
      triggers {
        id
        type
        name
        startPoint
        skipTo
      }
      interactiveData {
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
      hotspots {
        id
        name
        startPoint
      }
      overlays {
        id
        name
        jumpPoint
        templateActionId
      }
      templateActions {
        id
        title
        leftHotspotId
        rightHotspotId
      }
      triggers {
        id
        type
        name
        startPoint
        skipTo
      }
      interactiveData {
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
  }
`;

export { QUERY_ALL_MOVIES, QUERY_MOVIE_ID };
