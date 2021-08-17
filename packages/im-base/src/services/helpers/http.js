import { BASE_HEADERS, BASE_PARAMS, BASE_URL } from "../constants/modules.constants"

const getBaseUrl = (module) => {
    return BASE_URL[module];
}

const getBaseParams = (module) => {
    return BASE_PARAMS[module];
}

const getBaseHeaders = (module) => {
    return BASE_HEADERS[module];
}

export { getBaseUrl, getBaseHeaders, getBaseParams };