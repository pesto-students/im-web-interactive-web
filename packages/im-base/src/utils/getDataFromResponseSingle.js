// Lodash
import _get from "lodash/get";

const getDataFromResponseSingle = (response) => _get(response, "data");

export default getDataFromResponseSingle;
