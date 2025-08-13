import { createSlice } from "@reduxjs/toolkit";
import openBid from "./actions/openBid.js";
import closeBid from "./actions/closeBid.js";

const initialState = {
        bidId: null,
        type: null,
        value: null,
        openedTime: null,
        startPrice: null,
        endTime: null, 
        result: null, 
        stopPrice: null,
        profit: null,
}

export const bidSlice = createSlice({
    name: "bid",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder
        .addCase(openBid.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(openBid.fulfilled, (state, action) => {
            const {bidId, type, value, openedTime, startPrice, endTime, result, stopPrice, profit} = action.payload;
            state.bidId = bidId;
            state.type = type;
            state.value = value;
            state.openedTime = openedTime;
            state.startPrice = startPrice;
            state.endTime = endTime;
            state.result = result;
            state.stopPrice = stopPrice;
            state.profit = profit;
            state.loading = false;
        })
        .addCase(openBid.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
        .addCase(closeBid.pending, (state,action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(closeBid.fulfilled, (state, action) => {
           state.bidId = null;
            state.type = null;
            state.value = null;
            state.openedTime = null;
            state.startPrice = null;
            state.endTime = null;
            state.result = null;
            state.stopPrice = null;
            state.profit = null;
            state.loading = false

        })
        .addCase(closeBid.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
    }
});

export default bidSlice.reducer;