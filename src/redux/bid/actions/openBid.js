import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const openBid = createAsyncThunk("bid/openBid", async (bid,  { dispatch, rejectWithValue }) => {
    try {
        const createdBid = await axios.post(`${process.env.REACT_APP_API_URL}api/bids/bid`, bid,
                {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${userData.token}` // если нужен токен
                });
        dispatch(openBid(createdBid.data));
        return createdBid.data
    } catch (error) {
        console.error("Другая ошибка при создании ставки:", error);
        return rejectWithValue(error.response?.data || "Ошибка создания ставки");
    }
});

export default openBid;