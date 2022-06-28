import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';

export const getNodesBySystem = createAsyncThunk('node/getNodesBySystem', async (_, { rejectWithValue }) => {
    try {
        const res = await API.get('/node/system');
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const addDevice = createAsyncThunk('node/addDevice', async (data, { rejectWithValue }) => {
    try {
        const res = await API.post('/node', data);
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const getAvailableCameras = createAsyncThunk('node/getAvailableCameras', async (_, { rejectWithValue }) => {
    try {
        const res = await API.get('/node/cameras');
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});
