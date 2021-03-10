import axios from 'axios';
import router from './router';

axios.defaults.baseURL = 'http://127.0.0.1:8083';

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers.token = localStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

axios.interceptors.response.use(
    response => {
        if (response.data.code === -1) {
            localStorage.removeItem('token');
            router.push({
                path: "/login"
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    });

export default axios;