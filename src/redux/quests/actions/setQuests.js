import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setQuests = createAsyncThunk('quests/setQuests', async (type, {getState, rejectWithValue}) => {
    const {user} = getState();
    try {
        const quests = await axios.get(`${process.env.REACT_APP_API_URL}api/quests/quests`, {
            params: {type: type, userId: user.userId},
            headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userData.token}` // если нужен токен
      }})
      return quests.data;
    } catch (error) {
        console.error("Другая ошибка при звгрузке квестов:", error);
        return rejectWithValue(error.response?.data || "Ошибка звгрузке квестов");
    }
});

export default setQuests;