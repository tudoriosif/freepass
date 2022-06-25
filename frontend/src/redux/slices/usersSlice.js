import { createSlice } from '@reduxjs/toolkit';
import { getUsersBySystem, addUser, deleteUser } from '../thunks/users';

const initialState = {
    users: [],
    loading: false,
    error: '',
    message: ''
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsersBySystem.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.users = [];
        },
        [getUsersBySystem.fulfilled]: (state, action) => {
            state.users = action.payload?.users;
            state.loading = false;
            state.error = '';
        },
        [getUsersBySystem.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.users = [];
        },
        [addUser.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [addUser.fulfilled]: (state, action) => {
            state.message = action.payload?.message;
            state.loading = false;
            state.error = '';
        },
        [addUser.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.message = '';
        },
        [deleteUser.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.message = action.payload?.message;
            state.loading = false;
            state.error = '';
        },
        [deleteUser.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.message = '';
        }
    }
});

export { getUsersBySystem };

export default usersSlice.reducer;
