import { createSlice } from '@reduxjs/toolkit';
import { scanFinger, checkFinger, emptyFinger } from '../thunks/finger';

const initialState = {
    message: '',
    loading: false,
    error: ''
};

const fingerSlice = createSlice({
    name: 'finger',
    initialState,
    reducers: {},
    extraReducers: {
        [scanFinger.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [scanFinger.fulfilled]: (state, action) => {
            state.message = action.payload?.message;
            state.loading = false;
            state.error = '';
        },
        [scanFinger.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.message = '';
        },
        [checkFinger.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [checkFinger.fulfilled]: (state, action) => {
            state.message = action.payload?.message;
            state.loading = false;
            state.error = '';
        },
        [checkFinger.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.message = '';
        },
        [emptyFinger.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [emptyFinger.fulfilled]: (state, action) => {
            state.message = action.payload?.message;
            state.loading = false;
            state.error = '';
        },
        [emptyFinger.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.message = '';
        }
    }
});

export { scanFinger, checkFinger, emptyFinger };

export default fingerSlice.reducer;
