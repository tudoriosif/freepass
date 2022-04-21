import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';

export const scanFinger = createAsyncThunk('finger/scanFinger', async (systemID, { rejectWithValue }) => {
    try {
        const res = await API.post('/fingerprint/scan', systemID);
        return res.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data);
    }
});

export const checkFinger = createAsyncThunk('finger/checkFinger', async (systemID, { rejectWithValue }) => {
    try {
        const res = await API.post('/fingerprint/check', systemID);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const emptyFinger = createAsyncThunk('finger/emptyFinger', async (systemID, { rejectWithValue }) => {
    try {
        const res = await API.post('/fingerprint/empty', systemID);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export default {
    scanFinger,
    checkFinger,
    emptyFinger
};
