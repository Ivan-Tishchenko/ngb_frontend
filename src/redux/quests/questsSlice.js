import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quests: [],
}

export const questSlice = createSlice({
    name: "quests",
    initialState,
    reducers:{},
});

export default questSlice.reducer