// Constants
import { EMPTY_STRING } from "imbase/constants/base.constants";

// Lodash
import _isEmpty from "lodash/isEmpty";

export const getVideoIdFromURL = (url) => {    
    /*
    Youtube links can be of 2 forms :
        http://www.youtube.com/watch?v=u8nQa1cJyX8&a=GxdCwVVULXctT2lYDEPllDR0LRTutYfW
        http://www.youtube.com/watch?v=u8nQa1cJyX8
    
    parsing of id is done on basis of "v="
    */
    
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
