import { createSlice } from '@reduxjs/toolkit';
import { createTransmission, closeTransmission } from '../thunks/cam';

const initialState = {
    message: '',
    loading: false,
    error: ''
};

const camSlice = createSlice({
    name: 'cam',
    initialState,
    reducers: {},
    extraReducers: {
        [createTransmission.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = [];
        },
        [createTransmission.fulfilled]: (state, action) => {
            state.message = action.payload?.message;
            state.loading = false;
            state.error = '';
        },
        [createTransmission.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.message = [];
        }
    }
});

export { createTransmission, closeTransmission };

export default camSlice.reducer;
