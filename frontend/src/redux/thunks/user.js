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

export default {
    login
};
