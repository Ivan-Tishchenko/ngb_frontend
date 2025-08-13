import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const closeBid_user = createAsyncThunk("user/closeBid", async (bid, { getState, rejectWithValue }) => {
    const user = getState();
    try {

           const updateUser = await axios.post(`${process.env.REACT_APP_API_URL}api/users/user/update`, {
                    event: "bid result",
                    currentBid: bid.bidId,
                    profit: bid.profit,
                    result: bid.result,
                    userId: user.userId,

                }, {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${userData.token}` // если нужен токен
                });
            return updateUser.data;
    } catch (error) {
        console.error("Другая ошибка при закрытии ставки:", error);
        return rejectWithValue(error.response?.data || "Ошибка закрытии ставки");
    }
})

export default closeBid_user;