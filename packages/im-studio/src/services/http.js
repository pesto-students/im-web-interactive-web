import axios from "axios";
​
// Constants
import { EMPTY_OBJECT } from "../constants/base.constants";
​
// Helpers
import { getBaseUrl, getBaseParams, getHeaders } from "../helpers/http";
​
class Http {
  constructor(module, { headers = EMPTY_OBJECT } = EMPTY_OBJECT) {
    const axiosInstance = axios.create({
      baseURL: getBaseUrl(module),
      headers: {
        ...getHeaders(module),
        ...headers,
      },
    });
    Http[module] = axiosInstance;
  }
​
  static get(module, url, data) {
    return Http[module]({
      method: "GET",
      url,
      params: {
        ...getBaseParams(module),
        ...data,
      },
    });
  }
}
​
export default Http;