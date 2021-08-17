// Lodash
import _get from "lodash/get";

const getYTDataFromResponse = (response) => _get(response, "data");

export default getYTDataFromResponse;
