import {SERVER_CONNECTION_ERROR} from "./global-error-message";

export const handleConnectionError = (errMessage) => {
    switch (errMessage) {
        case SERVER_CONNECTION_ERROR.errorMessage :
            SERVER_CONNECTION_ERROR.response();
            break;
    }
}

export const handleError = (error) => {
    if (error.response?.data.errorMessage !== undefined)
        alert(error.response.data.errorMessage);
    else
        handleConnectionError(error.message);
}