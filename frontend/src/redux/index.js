import { configureStore } from '@reduxjs/toolkit';
import photoSlice from './slices/photoSlice';
import styleSlice from './slices/styleSlice';
import userSlice from './slices/userSlice';
import fingerSlice from './slices/fingerSlice';
import camSlice from './slices/camSlice';
import nodeSlice from './slices/nodeSlice';
import usersSlice from './slices/usersSlice';

export default configureStore({
    reducer: {
        style: styleSlice,
        user: userSlice,
        photo: photoSlice,
        finger: fingerSlice,
        cam: camSlice,
        node: nodeSlice,
        users: usersSlice
    }
});
