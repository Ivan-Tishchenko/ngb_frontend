import { createSlice } from "@reduxjs/toolkit";
import setQuests from "./actions/setQuests.js";

const initialState = {
    quests: [],
}

export const questSlice = createSlice({
    name: "quests",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder
        .addCase(setQuests.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(setQuests.fulfilled, (state, action) => {
            state.quests = action.payload;
            state.loading = false;
        })
        .addCase(setQuests.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
    }
});

export default questSlice.reducer