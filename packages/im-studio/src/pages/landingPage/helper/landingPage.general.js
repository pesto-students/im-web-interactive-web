// Constants
import { EMPTY_STRING } from "imbase/constants/base.constants";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Services
import youtubeService from "../../../services/youtubeService";

const getVideoId = (url) => {    
    if (!youtubeService.matchYoutubeUrl(url)) {
        return EMPTY_STRING;
    }

    let videoId = url.split('v=')[1];

    if(_isEmpty(videoId)) {
        return EMPTY_STRING;
    }

    const ampersandPosition = videoId.indexOf('&');

    if(ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }

    return videoId;
}

const isUploadDisabled = (videoData) => {
   return _isEmpty(videoData)
}

export { getVideoId, isUploadDisabled }