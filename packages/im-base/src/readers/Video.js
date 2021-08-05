// Lodash
import _property from "lodash/property";

const id = _property("id");
const title = _property("snippet.title");
const publishDate = _property("snippet.publishedAt");
const description = _property("snippet.description");
const thumbnail = _property("snippet.thumbnails.high");
const cover = _property("snippet.thumbnails.maxRes");

export default {
  id,
  title,
  publishDate,
  description,
  thumbnail,
  cover,
};
