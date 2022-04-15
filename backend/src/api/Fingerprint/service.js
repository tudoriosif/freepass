import axios from 'axios';
import config from '../../config/config';

const API = axios.create({
    baseURL: `${config.fingerURL}/fingerprint`
});

export const fingerprintService = async (op, noSystem, node) => {
    const headers = {
        Authorization: `Bearer ${noSystem}`,
        Node: node
    };
    const payload = {
        user: noSystem
    };

    const results = await API.post(`/${op}`, payload, {
        headers
    });

    return results.data;
};
