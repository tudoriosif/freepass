import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../thunks/user';

const initialState = {
    id: null,
    email: '',
    role: '',
    systemID: '',
    token: '',
    error: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            return { ...action.payload, error: '' };
        },
        [login.rejected]: (state, action) => {
            state.error = action.payload.error;
        },
        [register.fulfilled]: (state, action) => {
            return { ...action.payload, error: '' };
        },
        [register.rejected]: (state, action) => {
            state.error = action.payload.error;
        }
    }
});

export { login, register };

export default userSlice.reducer;
