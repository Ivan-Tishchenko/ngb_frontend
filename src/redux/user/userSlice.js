import { createSlice } from "@reduxjs/toolkit";
import setUser from "./actions/setUser.js";
import openBid_user from "./actions/openBid.js";
import closeBid_user from "./actions/closeBid.js";

const initialState = {
    userAvatarURL: null,
    userName: window.Telegram?.WebApp?.tg?.initDataUnsafe?.user?.first_name + window.Telegram?.WebApp?.tg?.initDataUnsafe?.user?.last_name,
    userLink: window.Telegram?.WebApp?.tg?.initDataUnsafe?.user?.username,
    userId: window.Telegram?.WebApp?.tg?.initDataUnsafe?.user?.id,
    rang: 1,
    wallet: null,
    xpPoints: 0,
    ballance: 0,
    tickets: 0,
    currentBid: null,
    reffCode: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder
        .addCase(setUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(setUser.fulfilled, (state, action)=>{
            const { userId, userName, userLink, rang, wallet, xp, reffCode, ballance, tickets, currentBid, } = action.payload;
            state.userName = userName;
            state.ballance = ballance;
            state.userId = userId;
            state.userLink = userLink;
            state.rang = rang;
            state.wallet = wallet;
            state.xpPoints = xp;
            state.reffCode = reffCode;
            state.tickets = tickets;
            state.currentBid = currentBid;
            state.loading = false;
        })
        .addCase(setUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
        .addCase(openBid_user.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(openBid_user.fulfilled, (state, action) => {
            state.ballance = action.payload.ballance;
            state.currentBid = action.payload.currentBid;
            state.loading = false;
        })
        .addCase(openBid_user.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
        .addCase(closeBid_user.pending, (state,action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(closeBid_user.fulfilled, (state,action) => {
            state.ballance = action.payload.ballance;
            state.xp = action.payload.xp;
            state.currentBid = null;
            state.loading = false

        })
        .addCase(closeBid_user.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
    }
});

export default userSlice.reducer