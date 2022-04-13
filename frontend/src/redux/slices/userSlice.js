import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../thunks/user';
import { checkPhoto, sendPhoto } from './photoSlice';

const initialState = {
    id: null,
    email: '',
    role: '',
    systemID: '',
    noSystem: '',
    token: '',
    faceToken: '',
    fingerToken: 'randomtoken',
    error: '',
    loading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [register.pending]: (state, action) => {
            state.loading = true;
        },
        [sendPhoto.pending]: (state, action) => {
            state.loading = true;
        },
        [checkPhoto.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            return { ...initialState, ...action.payload, error: '', loading: false };
        },
        [login.rejected]: (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        },
        [register.fulfilled]: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            return { ...initialState, ...action.payload, error: '', loading: false };
        },
        [register.rejected]: (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        },
        [sendPhoto.fulfilled]: (state, action) => {
            localStorage.setItem('faceToken', action.payload.faceToken);
            state.faceToken = action.payload.faceToken;
            state.loading = false;
        },
        [sendPhoto.rejected]: (state, action) => {
            localStorage.removeItem('faceToken');
            state.faceToken = '';
            state.loading = false;
        },
        [checkPhoto.fulfilled]: (state, action) => {
            localStorage.setItem('faceToken', action.payload.faceToken);
            state.faceToken = action.payload.faceToken;
            state.loading = false;
        },
        [checkPhoto.rejected]: (state, action) => {
            localStorage.removeItem('faceToken');
            state.faceToken = '';
            state.loading = false;
        }
    }
});

export { login, register };

export default userSlice.reducer;
