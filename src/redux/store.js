import { configureStore } from '@reduxjs/toolkit';
import userSlicer from './user/userSlice.js';
import bidSliser from './bid/bidSlice.js';
import questsSlicer from './quests/questsSlice.js';

export const store = configureStore({
    reducer: {
        user: userSlicer,
        bid: bidSliser,
        quests: questsSlicer,
    }
});