// Lodash
import _get from "lodash/get";

const getDataFromResponse = (response) => _get(response, "data.data");

export default getDataFromResponse;
