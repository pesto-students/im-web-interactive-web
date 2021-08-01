const MODULES = {
    YOUTUBE: "youtube",
    YOUTUBE_API_KEY: "AIzaSyDUMhTyytqgr7jLHt5afWCWUJSuNwAug3w"
}

const BASE_URL = {
    [MODULES.YOUTUBE]: "https://youtube.googleapis.com/youtube/v3"
}

const BASE_PARAMS = {
    [MODULES.YOUTUBE]: {
        part:'snippet',
        key: process.env.YOUTUBE_API_KEY
    }
}

const BASE_HEADERS = {
    [MODULES.YOUTUBE]: {}
}

const URL_REGEX = {
    [MODULES.YOUTUBE]: /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
}

export { 
    BASE_HEADERS,
    BASE_PARAMS,
    BASE_URL,
    MODULES,
    URL_REGEX
};