import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';

export const sendPhoto = createAsyncThunk('photo/sendPhoto', async (photoBase64, { rejectWithValue }) => {
    try {
        const res = await API.post('/photo/upload', photoBase64);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const checkPhoto = createAsyncThunk('photo/checkPhoto', async (photoBase64, { rejectWithValue }) => {
    try {
        const res = await API.post('/photo/check', photoBase64);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export default {
    sendPhoto,
    checkPhoto
};
