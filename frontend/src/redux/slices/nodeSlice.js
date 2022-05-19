import { createSlice } from '@reduxjs/toolkit';
import { getNodesBySystem } from '../thunks/node';

const initialState = {
    nodes: [],
    loading: false,
    error: ''
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
        }
    }
});

export { getNodesBySystem };

export default nodeSlice.reducer;
