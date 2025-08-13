import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import closeBid_user from "../../user/actions/closeBid";

const closeBid = createAsyncThunk("bid/closeBid", async (bidId, { dispatch, rejectWithValue }) => {
    try {
        const bidInfo = await axios.get(`${process.env.REACT_APP_API_URL}api/bids/bid`, {
            params: {bidId: encodeURIComponent(bidId)}
        });
        
        if(bidInfo.data && bidInfo.data.result) {
            dispatch(closeBid_user(bidInfo.data));
        }
        return bidInfo.data;
    } catch (error) {
        console.error("Другая ошибка при закрытии ставки:", error);
        return rejectWithValue(error.response?.data || "Ошибка закрытии ставки");
    }
});

export default closeBid;