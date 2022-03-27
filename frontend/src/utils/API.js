import axios from 'axios';

const API = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
    timeout: 10000,
    headers: {
        ...(localStorage.getItem('token') && { Authorization: `Bearer ${localStorage.getItem('token')}` })
    }
});

export const post = (path, data) => API.post(path, data);

export const get = (path) => API.get(path);

export default {
    post,
    get
};
