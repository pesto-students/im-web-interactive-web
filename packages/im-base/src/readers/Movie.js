// Lodash
import _property from "lodash/property";

const id = _property("id");
const title = _property("title");
const releaseDate = _property("releaseDate");
const rating = _property("rating");
const genre = _property("genre");
const description = _property("description");
const thumbnail = _property("images.thumbnail");
const cover = _property("images.cover");
const url = _property("url");

export default {
  id,
  title,
  releaseDate,
  rating,
  genre,
  description,
  thumbnail,
  cover,
  url,
};
