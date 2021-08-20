import {
  NEW_RELEASES,
  FEATURED_MOVIES,
  QUERY_ALL_MOVIES,
} from "imbase/graphql/queries";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

const getQueryParams = (movieCriteria, currentUser) => {
  const GET_QUERY_PARAMS = {
    "new-releases": {
      headingName: "New Releases",
      query: NEW_RELEASES,
      variables: EMPTY_OBJECT,
      dataPath: "getNewReleases",
      linkTo: (id) => {
        return `/film/${id}`;
      },
    },
    featured: {
      headingName: "Featured Movies",
      query: FEATURED_MOVIES,
      dataPath: "getFeatured",
      variables: EMPTY_OBJECT,
      linkTo: (id) => {
        return `/film/${id}`;
      },
    },
    "published-movies": {
      headingName: "Published",
      query: QUERY_ALL_MOVIES,
      variables: {
        userId: currentUser,
        isPublished: true,
      },
      dataPath: "movies",
      linkTo: (id) => {
        return `video/${id}/edit`;
      },
    },
    "unpublished-movies": {
      headingName: "Continue Editing",
      query: QUERY_ALL_MOVIES,
      variables: {
        userId: currentUser,
        isPublished: false,
      },
      dataPath: "movies",
      linkTo: (id) => {
        return `video/${id}/edit`;
      },
    },
    "featured-edited": {
      headingName: "Featured",
      query: QUERY_ALL_MOVIES,
      variables: {
        userId: currentUser,
        isFeatured: true,
      },
      dataPath: "movies",
      linkTo: (id) => {
        return `video/${id}/edit`;
      },
    },
  };

  return GET_QUERY_PARAMS[movieCriteria];
};

export { getQueryParams };
