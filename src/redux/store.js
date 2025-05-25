import { configureStore } from '@reduxjs/toolkit';
import userSlicer from './userSlice';

export const store = configureStore({
    reducer: {
        user: userSlicer,
    }
});