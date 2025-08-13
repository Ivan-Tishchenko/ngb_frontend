import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const closeBid = createAsyncThunk("bid/openBid", async (bidId, { dispatch, rejectWithValue }) => {
    try {
        const bidInfo = await axios.get(`${process.env.REACT_APP_API_URL}api/bids/bid`, {
            params: {bidId}
        });
        
        if(bidInfo.data && bidInfo.data.result) {
            dispatch(closeBid(bidInfo.data));
        }
        return bidInfo.data;
    } catch (error) {
        console.error("Другая ошибка при закрытии ставки:", error);
        return rejectWithValue(error.response?.data || "Ошибка закрытии ставки");
    }
});

export default closeBid;