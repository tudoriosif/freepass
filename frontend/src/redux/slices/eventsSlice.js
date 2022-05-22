import { createSlice } from '@reduxjs/toolkit';
import { getEventsBySystem } from '../thunks/events';

const initialState = {
    events: [],
    loading: false,
    error: ''
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: {
        [getEventsBySystem.pending]: (state) => {
            state.loading = true;
            state.error = '';
            state.events = [];
        },
        [getEventsBySystem.fulfilled]: (state, action) => {
            state.events = action.payload?.events;
            state.loading = false;
            state.error = '';
        },
        [getEventsBySystem.rejected]: (state, action) => {
            state.error = action.payload?.error;
            state.loading = false;
            state.events = [];
        }
    }
});

export { getEventsBySystem };

export default eventsSlice.reducer;
