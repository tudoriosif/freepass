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
    extraReducers: {}
});

export { createTransmission, closeTransmission };

export default camSlice.reducer;
