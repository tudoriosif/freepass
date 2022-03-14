import { createSlice } from '@reduxjs/toolkit';
import { login } from '../thunks/user';

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
            return { ...action.payload, error: '' };
        },
        [login.rejected]: (state, action) => {
            state.error = action.payload.error;
        }
    }
});

export { login };

export default userSlice.reducer;
