// Axios
import axios from "axios";

// Constants
import { MODULES , BASE_URL, URL_REGEX } from "./constants/modules.constants";
import { getBaseParams } from "./helpers/http";

const getMovieById = ({
    videoId,
    ...restProps
  }) => {
    return axios.get(BASE_URL[MODULES.YOUTUBE] + "/videos", { 
        params: {
            ...getBaseParams(MODULES.YOUTUBE),
            id: videoId,
            ...restProps,
        }
    });
}

/*
 * Youtube links can be of 2 forms :
 *  http://www.youtube.com/watch?v=u8nQa1cJyX8&a=GxdCwVVULXctT2lYDEPllDR0LRTutYfW
 *  http://www.youtube.com/watch?v=u8nQa1cJyX8
 * 
 * Method returns true if URL matches youtube
 */
function matchYoutubeUrl(url) {
    const youtubeRegex = URL_REGEX[MODULES.YOUTUBE];
    if(url.match(youtubeRegex)){
        return url.match(youtubeRegex)[1];
    }
    return false;
}

function getVideoDataFromResponse (response) {
    return response.data.items[0];
}

const youtubeService = { getMovieById, getVideoDataFromResponse, matchYoutubeUrl };
export default youtubeService;