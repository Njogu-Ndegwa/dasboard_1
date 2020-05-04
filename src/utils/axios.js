import axios from 'axios';
import api from '../config/api';

const { BASE_URL, TOKEN } = api;

const instance = axios.create({
    baseURL: BASE_URL,
    mode: "cors",
    headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': `application/json` }
});

// instance.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

// instance.interceptors.request.use(
//     (config) => {
//         //   let token = localStorage.getItem('authtoken');

//         // if (token) {
//         config.headers['Authorization'] = `Bearer ${TOKEN}`;
//         // }

//         config.headers['Content-Type'] = `application/json`;
//         config.headers['Accept'] = `application/json`;

//         return config;
//     },

//     (error) => {
//         return Promise.reject(error.response || error.message);
//     }
// );

const getHeaders = () => {
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,
        },
    };
};


export default instance;