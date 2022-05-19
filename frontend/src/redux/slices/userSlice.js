import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../thunks/user';
import { checkFinger, emptyFinger, scanFinger } from './fingerSlice';
import { checkPhoto, sendPhoto } from './photoSlice';

const initialState = {
    // id: null,
    // email: '',
    // role: '',
    // systemID: '',
    // noSystem: '',
    // token: '',
    // faceToken: '',
    // fingerToken: '',
    // hasFace: false,
    // hasFigner: false,
    // error: '',
    // loading: false
    id: '625c68ca786ab3bc6e723b72',
    email: 'tudor_iosif@yahoo.com',
    role: 'MAIN',
    systemID: '58a74bf7-257e-4ccf-b75c-651b7752bf27',
    noSystem: 1,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1YzY4Y2E3ODZhYjNiYzZlNzIzYjcyIiwiZW1haWwiOiJ0dWRvcl9pb3NpZkB5YWhvby5jb20iLCJzeXN0ZW1JRCI6IjU4YTc0YmY3LTI1N2UtNGNjZi1iNzVjLTY1MWI3NzUyYmYyNyIsInJvbGUiOiJNQUlOIiwibm9TeXN0ZW0iOjEsImhhc0ZhY2UiOnRydWUsImhhc0ZpbmdlciI6dHJ1ZX0sImlhdCI6MTY1MjU1OTQ4M30.tiqIYBF0d9ntI6U0XxNWryIGdLYsD-zTsgI5YYR5INg',
    faceToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1YzY4Y2E3ODZhYjNiYzZlNzIzYjcyIiwiZW1haWwiOiJ0dWRvcl9pb3NpZkB5YWhvby5jb20iLCJwYXRoIjoiLi9zcmMvZmFjZXMvdHVkb3JfaW9zaWZAeWFob28uY29tL2NoZWNrIiwicmVzdWx0cyI6MjB9LCJpYXQiOjE2NTI1NTk0ODV9.9OH3WCvstoGE2KzkoGqgWPUWrcUUZ5BXuwo3v29o8Dw',
    fingerToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1YzY4Y2E3ODZhYjNiYzZlNzIzYjcyIiwiZW1haWwiOiJ0dWRvcl9pb3NpZkB5YWhvby5jb20iLCJjb25maWRlbmNlIjoyMH0sImlhdCI6MTY1MjU1OTQ5MX0.xGvLeWE93JDzENY8Mi30lD4K5bcwAHslBiBfMJkv4Yw',
    hasFace: true,
    hasFigner: false,
    error: '',
    loading: false,
    hasFinger: true
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
        [scanFinger.pending]: (state, action) => {
            state.loading = true;
        },
        [checkFinger.pending]: (state, action) => {
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
        [scanFinger.fulfilled]: (state, action) => {
            localStorage.setItem('fingerToken', action.payload.fingerToken);
            state.fingerToken = action.payload.fingerToken;
            state.loading = false;
        },
        [scanFinger.rejected]: (state, action) => {
            localStorage.removeItem('fingerToken');
            state.fingerToken = '';
            state.loading = false;
        },
        [checkFinger.fulfilled]: (state, action) => {
            localStorage.setItem('fingerToken', action.payload.fingerToken);
            state.fingerToken = action.payload.fingerToken;
            state.loading = false;
        },
        [checkFinger.rejected]: (state, action) => {
            localStorage.removeItem('fingerToken');
            state.fingerToken = '';
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
