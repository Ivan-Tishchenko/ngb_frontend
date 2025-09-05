import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getBidData = createAsyncThunk("bid/getBidData", async (bidId, { dispatch, rejectWithValue }) => {
    try {
        const bidInfo = await axios.get(`${process.env.REACT_APP_API_URL}api/bids/bid`, {
            params: {bidId: encodeURIComponent(bidId)}
        });
        return bidInfo.data;
    } catch (error) {
        console.error("Другая ошибка при получении ставки:", error);
        return rejectWithValue(error.response?.data || "Ошибка получении ставки");
    }
});

export default getBidData;