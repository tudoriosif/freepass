import { createSlice } from '@reduxjs/toolkit';
import { getNodesBySystem, addDevice, getAvailableCameras } from '../thunks/node';

const initialState = {
    nodes: [],
    availableCameras: [],
    loading: false,
    error: '',
    message: ''
};

const nodeSlice = createSlice({
    name: 'node',
    initialState,
    reducers: {},
    extraReducers: {
        [getNodesBySystem.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.nodes = [];
        },
        [getNodesBySystem.fulfilled]: (state, action) => {
            state.nodes = action.payload?.nodes;
            state.loading = false;
            state.error = '';
        },
        [getNodesBySystem.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.nodes = [];
        },
        [getAvailableCameras.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.availableCameras = [];
        },
        [getAvailableCameras.fulfilled]: (state, action) => {
            state.availableCameras = action.payload?.availableCameras;
            state.loading = false;
            state.error = '';
        },
        [getAvailableCameras.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.availableCameras = [];
        },
        [addDevice.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        [addDevice.fulfilled]: (state, action) => {
            state.message = action.payload?.message;
            state.loading = false;
            state.error = '';
        },
        [addDevice.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.message = '';
        }
    }
});

export { getNodesBySystem };

export default nodeSlice.reducer;
