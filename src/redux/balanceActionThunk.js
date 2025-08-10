import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const openBid = createAsyncThunk("user/setBid", async (bid,  { getState, rejectWithValue }) => {
    const user = getState();
    try {
        const createdBid = await axios.post(`${process.env.REACT_APP_API_URL}api/bids/bid`, bid,
                {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${userData.token}` // если нужен токен
                });
        if(createdBid.data) {
            const updateUser = await axios.post(`${process.env.REACT_APP_API_URL}api/users/update`, {
                    event: "bid",
                    bid: createdBid.data,
                    user: user,
                }, 
                 {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${userData.token}` // если нужен токен
                })
            return updateUser.data;
        }
    } catch (error) {
        console.error("Другая ошибка при создании ставки:", error);
        return rejectWithValue(error.response?.data || "Ошибка создания ставки");
    }
})

const closeBid = createAsyncThunk("user/closeBid", async (bidId, { getState, rejectWithValue }) => {
    const user = getState();
    try {
        const bidInfo = await axios.get(`${process.env.REACT_APP_API_URL}api/bids/bid`, {
            params: {bidId}
        });
        if(bidInfo.data && bidInfo.data.result) {
           const updateUser = await axios.post(`${process.env.REACT_APP_API_URL}api/users/update`, {
                    event: "bid result",
                    bid: bidInfo.data,
                    user: user,
                }, {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${userData.token}` // если нужен токен
                });
            return {user: updateUser.data, bid: bidInfo.data };
        }
    } catch (error) {
        console.error("Другая ошибка при закрытии ставки:", error);
        return rejectWithValue(error.response?.data || "Ошибка закрытии ставки");
    }
})

export default openBid;
export {closeBid};