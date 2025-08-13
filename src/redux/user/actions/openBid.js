import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const openBid_user = createAsyncThunk("user/setBid", async (bid,  { getState, rejectWithValue }) => {
    const user = getState();
    try {
       
        const updateUser = await axios.post(`${process.env.REACT_APP_API_URL}api/users/update`, {
                event: "bid",
                currentBid: bid.bidId,
                userId: user.userId,
            }, 
                {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${userData.token}` // если нужен токен
            })
        return updateUser.data;
    } catch (error) {
        console.error("Другая ошибка при создании ставки:", error);
        return rejectWithValue(error.response?.data || "Ошибка создания ставки");
    }
});

export default openBid_user;