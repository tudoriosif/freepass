import { configureStore } from '@reduxjs/toolkit';
import styleSlice from './slices/styleSlice';

export default configureStore({
    reducer: {
        style: styleSlice
    }
});
