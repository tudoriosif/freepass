import { createSlice } from '@reduxjs/toolkit';
import { sendPhoto, checkPhoto } from '../thunks/photo';

const initialState = {
    message: '',
    loading: false,
    error: ''
};

const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {},
    extraReducers: {
        [sendPhoto.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [sendPhoto.fulfilled]: (state, action) => {
            state.message = action.payload?.message;
            state.loading = false;
            state.error = '';
        },
        [sendPhoto.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.message = '';
        },
        [checkPhoto.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [checkPhoto.fulfilled]: (state, action) => {
            state.message = action.payload?.message;
            state.loading = false;
            state.error = '';
        },
        [checkPhoto.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.message = '';
        }
    }
});

export { sendPhoto, checkPhoto };

export default photoSlice.reducer;
