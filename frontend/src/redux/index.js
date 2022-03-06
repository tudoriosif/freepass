import { configureStore } from '@reduxjs/toolkit';
import styleSlice from './slices/styleSlice';
import userSlice from './slices/userSlice';

export default configureStore({
    reducer: {
        style: styleSlice,
        user: userSlice
    }
});
