import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const openBid = createAsyncThunk("user/setBid", async (bid,  { getState, rejectWithValue }) => {
    const user = getState();
    try {
        const createdBid = await axios.post(`${process.env.REACT_APP_API_URL}api/bid/bid`, {
                body: bid,
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${userData.token}` // если нужен токен
                },
            });
        if(createdBid.data) {
            const updateUser = await axios.post(`${process.env.REACT_APP_API_URL}api/user/update`, {
                body: {
                    event: "bid",
                    bid: createdBid.data,
                    user: user,
                }
            })
            return updateUser.data;
        }
    } catch (error) {
        console.error("Другая ошибка при создании ставки:", error);
        return rejectWithValue(error.response?.data || "Ошибка создания ставки");
    }
})

export default openBid;