import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nav: {
        isOpen: false
    }
};

const styleSlice = createSlice({
    name: 'style',
    initialState,
    reducers: {
        switchNav: (state, action) => {
            state.nav.isOpen = !state.nav.isOpen;
        }
    }
});

export const { switchNav } = styleSlice.actions;

export default styleSlice.reducer;
