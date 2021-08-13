// Lodash
import _property from "lodash/property";

const id = _property("id");
const title = _property("title");
const releaseDate = _property("releaseDate");
const rating = _property("rating");
const genre = _property("genre");
const url = _property("url");
const description = _property("description");
const thumbnail = _property("thumbnails.high.url");
const cover = _property("thumbnails.maxres.url");
const coverStandard = _property("thumbnails.standard.url");
const coverHigh = _property("thumbnails.high.url");

export default {
  id,
  title,
  releaseDate,
  rating,
  genre,
  url,
  description,
  thumbnail,
  cover,
  coverStandard,
  coverHigh,
};
