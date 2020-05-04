import axios from 'axios';
import { BASE_URL } from './apis';
import * as LocalStorage from './localstorage';
import { notification } from 'antd'

const token = localStorage.getItem('access_token');

const isHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
        false : true
}

const requestHandler = (request) => {
    if (isHandlerEnabled(request)) {
        if ( token) {
            request.headers['Authorization'] = `Bearer ${token}`;
            request.headers['Content-Type'] = `application/json`;
        }
        request.headers['Access-Control-Allow-Origin'] = '*';
        //else redirect user to login
    }
    return request
}
const errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
        // Handle errors
        console.log('handling error', error)
        // notification.error({
        //     message: `Authentication Failed`,
        //     description: `${error}`,
        // });

    }
    return Promise.reject({ ...error })
}

const successHandler = (response) => {
    if (isHandlerEnabled(response.config)) {
        // Handle responses
        //console.log('Got a successful response ', response);
    }
    return response
}

const instance = axios.create({
    baseURL: BASE_URL,
    mode: 'cors',
});
//Enable Request interceptor
instance.interceptors.request.use(
    request => requestHandler(request)
)
instance.interceptors.response.use((response) => response, (error) => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        console.log("Logging the error", error);
        // logger.log(error);

        notification['error']({
            message: 'System Error',
            description:
                'An unexpected error occurred.',
        });
    } else {

        const { response } = error;
        const { request, ...errorObject } = response;

        notification['warn']({
            message: 'Server Message',
            description:
                `${errorObject.data.message}`,
        });
    }

    return Promise.reject(error);
});

export default instance;

