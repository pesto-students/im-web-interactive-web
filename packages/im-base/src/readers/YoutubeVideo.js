// Lodash
import _property from "lodash/property";

const id = _property("id");
const title = _property("snippet.title");
const releaseDate = _property("snippet.publishedAt");
const tags = _property("snippet.tags");
const description = _property("snippet.description");
const thumbnails = _property("snippet.thumbnails");

export default {
  id,
  title,
  releaseDate,
  tags,
  description,
  thumbnails,
};
