import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';

export const getEventsBySystem = createAsyncThunk('events/getEventsBySystem', async (_, { rejectWithValue }) => {
    try {
        const res = await API.get('/events/system');
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});
