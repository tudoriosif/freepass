import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';

export const getUsersBySystem = createAsyncThunk('users/getUsersBySystem', async (_, { rejectWithValue }) => {
    try {
        const res = await API.get('/users/all');
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});
