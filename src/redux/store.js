import { configureStore } from '@reduxjs/toolkit';
import userSlicer from './user/userSlice';
import bidSliser from './bid/bidSlice';
import questsSlicer from './quests/questsSlice';

export const store = configureStore({
    reducer: {
        user: userSlicer,
        bid: bidSliser,
        quests: questsSlicer,
    }
});