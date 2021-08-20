import dotenv from "dotenv";

dotenv.config();

const MODULES = {
  YOUTUBE: "youtube",
};

const BASE_URL = {
  [MODULES.YOUTUBE]: "https://youtube.googleapis.com/youtube/v3",
};

const BASE_PARAMS = {
  [MODULES.YOUTUBE]: {
    part: "snippet",
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
};

const BASE_HEADERS = {
  [MODULES.YOUTUBE]: {},
};

const URL_REGEX = {
  [MODULES.YOUTUBE]: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
};

export { BASE_HEADERS, BASE_PARAMS, BASE_URL, MODULES, URL_REGEX };
