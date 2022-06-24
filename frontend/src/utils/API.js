import axios from 'axios';

const API = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        AuthorizationFace: localStorage.getItem('faceToken'),
        AuthorizationFinger: localStorage.getItem('fingerToken')
    }
});

export const post = (path, data) => API.post(path, data);

export const get = (path) => API.get(path);

export const put = (path, data) => API.put(path, data);

export default {
    post,
    get,
    put
};
