// Lodash
import _property from "lodash/property";

const id = _property("id");
const title = _property("name");
const releaseDate = _property("releaseDate");
const rating = _property("rating");
const description = _property("description");

export default {
  id,
  title,
  releaseDate,
  rating,
  description,
};
