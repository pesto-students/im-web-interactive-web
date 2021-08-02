// Axios
import axios from "axios";

// Constants
import { MODULES , BASE_URL, URL_REGEX } from "./constants/modules.constants";

const getMovieById = ({
    videoId,
    ...restProps
  }) => {
    return axios.get(BASE_URL[MODULES.YOUTUBE] + "/videos", { 
        params: {
            id: videoId,
            // key: process.env.REACT_APP_YOUTUBE_API_KEY,
            key: MODULES.YOUTUBE_API_KEY,
            part: 'snippet',
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

const getVideoDataFromResponse = (response ) => {
    return response && response.data && response.data.items[0];
}

export default { getMovieById, getVideoDataFromResponse, matchYoutubeUrl };