import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
}

export const questSlice = createSlice({
    name: "quests",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder
        .addCase()
    }
});

export default questSlice.reducer