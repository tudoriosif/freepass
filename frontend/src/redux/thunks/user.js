import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';

export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await API.post('/auth/login', { email, password });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk(
    'user/register',
    async ({ email, password, systemID }, { rejectWithValue }) => {
        try {
            const res = await API.post('/auth/signup', { email, password, systemID });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateAccount = createAsyncThunk(
    'user/updateAccount',
    async ({ id, email, password }, { rejectWithValue }) => {
        try {
            const res = await API.put(`/users/${id}`, { email, password });
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data || error);
        }
    }
);

export default {
    login
};

// IMPLEMENTE hasFace hasFinger on action instead of singup
