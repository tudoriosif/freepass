import { createSlice } from '@reduxjs/toolkit';
import { getUsersBySystem } from '../thunks/users';

const initialState = {
    users: [],
    loading: false,
    error: ''
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
        }
    }
});

export { getUsersBySystem };

export default usersSlice.reducer;
