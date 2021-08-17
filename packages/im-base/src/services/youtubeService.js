import _get from "lodash/get";

// Axios
import axios from "axios";

// Reader
import YoutubeReader from "imbase/readers/YoutubeVideo";

// Constants
import { MODULES, BASE_URL, URL_REGEX } from "./constants/modules.constants";
import { getBaseParams } from "./helpers/http";

const getMovieById = ({ videoId, ...restProps }) => {
  return axios.get(BASE_URL[MODULES.YOUTUBE] + "/videos", {
    params: {
      ...getBaseParams(MODULES.YOUTUBE),
      id: videoId,
      ...restProps,
    },
  });
};

const getComments = ({
  videoId,
  maxResults = 5,
  order = "relevance",
  ...restProps
}) => {
  return axios.get(BASE_URL[MODULES.YOUTUBE] + "/commentThreads", {
    params: {
      ...getBaseParams(MODULES.YOUTUBE),
      videoId: videoId,
      maxResults,
      order,
      ...restProps,
    },
  });
};

/*
 * Youtube links can be of 2 forms :
 *  http://www.youtube.com/watch?v=u8nQa1cJyX8&a=GxdCwVVULXctT2lYDEPllDR0LRTutYfW
 *  http://www.youtube.com/watch?v=u8nQa1cJyX8
 *
 * Method returns true if URL matches youtube
 */
function matchYoutubeUrl(url) {
  const youtubeRegex = URL_REGEX[MODULES.YOUTUBE];
  if (url.match(youtubeRegex)) {
    return url.match(youtubeRegex)[1];
  }
  return false;
}

function getVideoDataFromResponse(response) {
  return response.data.items[0];
}

function getVideoDataFromYT(response) {
  const getDataFromResponse = _get(response, "data.items[0]");

  return {
    id: YoutubeReader.id(getDataFromResponse),
    title: YoutubeReader.title(getDataFromResponse),
    description: YoutubeReader.description(getDataFromResponse),
    thumbnails: YoutubeReader.thumbnails(getDataFromResponse),
  };
}

const youtubeService = {
  getMovieById,
  getVideoDataFromResponse,
  matchYoutubeUrl,
  getVideoDataFromYT,
  getComments,
};
export default youtubeService;
