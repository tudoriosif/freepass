import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 1,
    email: 'tudor_iosif@yahoo.com',
    role: 'MAIN',
    token: 'testtoken'
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
});

export default userSlice.reducer;
