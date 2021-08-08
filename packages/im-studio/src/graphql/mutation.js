import { gql } from "@apollo/client";

const movieQuery = `id
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
    }`;

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

const CREATE_HOTSPOT = gql`
  mutation CREATE_HOTSPOT($mid: ID!, $data: InputHotspot!) {
    addHotspot(movieId: $mid, data: $data) {
      id
    }
  }
`;

export { CREATE_USER, CREATE_MOVIE, UPDATE_MOVIE_ID, CREATE_HOTSPOT };
