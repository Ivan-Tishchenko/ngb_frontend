import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const connectWallet = createAsyncThunk("user/connectWallet", async (wallet, { getState, rejectWithValue }) => {
    const {user} = getState();
    try {
           const updateUser = await axios.post(`${process.env.REACT_APP_API_URL}api/users/user/update`, {
                    event: "connect wallet",
                    userId: user.userId,
                    wallet,

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

export default connectWallet;