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
