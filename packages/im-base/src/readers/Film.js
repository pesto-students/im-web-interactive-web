// Lodash
import _property from "lodash/property";

const id = _property("id");
const title = _property("title");
const releaseDate = _property("releaseDate");
const rating = _property("rating");
const genre = _property("genre");
const description = _property("description");
const thumbnail = _property("thumbnails.high.url");
const cover = _property("thumbnails.maxres.url");

export default {
  id,
  title,
  releaseDate,
  rating,
  genre,
  description,
  thumbnail,
  cover,
};
