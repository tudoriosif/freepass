import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';

export const createTransmission = createAsyncThunk(
    'cam/createTransmission',
    async (nodeNumber, { rejectWithValue }) => {
        try {
            const res = await API.post('/cam/start', nodeNumber);
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const closeTransmission = createAsyncThunk('cam/closeTransmission', async (nodeNumber, { rejectWithValue }) => {
    try {
        const res = await API.post('/cam/stop', nodeNumber);
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});
