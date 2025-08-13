import { createSlice } from "@reduxjs/toolkit";
import setUser from "./actions/setUser";
import openBid from "./actions/openBid";
import closeBid from "./actions/closeBid";

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
            const { userId, username, first_name, last_name, rang, wallet, xp, reffCode, ballance, tickets, bid } = action.payload;
            state.userName = first_name + last_name;
            state.ballance = ballance;
            state.userId = userId;
            state.userLink = username;
            state.rang = rang;
            state.wallet = wallet;
            state.xpPoints = xp;
            state.reffCode = reffCode;
            state.tickets = tickets;
            state.bid = bid;
            state.loading = false;
        })
        .addCase(setUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
        .addCase(openBid.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(openBid.fulfilled, (state, action) => {
            state.ballance = action.payload.ballance;
            state.loading = false;
        })
        .addCase(openBid.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
        .addCase(closeBid.pending, (state,action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(closeBid.fulfilled, (state,action) => {
            state.ballance = action.payload.ballance;
            state.xp = action.payload.xp;
            state.currentBid = null;
            state.loading = false

        })
        .addCase(closeBid.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
    }
});

export default userSlice.reducer