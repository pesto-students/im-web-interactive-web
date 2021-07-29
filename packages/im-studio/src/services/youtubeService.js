// import Http from "./http"

const getMovieById = (API_KEY, id) => { 
    // TODO : Change to API / Promise 
    return `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`
}

// const getComments = ({
//     videoId,
//     maxResults = 5,
//     order = "relevance",
//     ...restProps
//   }) => {
//     return Http.get(MODULES.YOUTUBE, "/commentThreads", {
//       videoId,
//       maxResults,
//       order,
//       ...restProps,
//     });
//   };
  

export default { getMovieById }