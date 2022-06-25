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

export const addUser = createAsyncThunk('users/addUser', async (data, { rejectWithValue }) => {
    try {
        const res = await API.post('/users', data);
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id, { rejectWithValue }) => {
    try {
        const res = await API.deleteCall(`/users/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});
