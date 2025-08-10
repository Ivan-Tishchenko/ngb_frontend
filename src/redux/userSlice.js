import { createSlice } from "@reduxjs/toolkit";
import setUser from "./setUserActionThunk";
import openBid, {closeBid} from "./balanceActionThunk";

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
    bid: {
        loading: false
    },
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
            state.bid = {loading:true};
            state.loading = true;
            state.error = null;
        })
        .addCase(openBid.fulfilled, (state, action) => {
            state.bid = {...action.payload.bid, loading: false};
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
            state.bid = {loading: false,};
            state.ballance = action.payload.user.ballance;
            state.xp = action.payload.user.xp;
            state.bid = {result: action.payload.bid.result, loading: false, profit: action.payload.bid.profit};
            state.loading = false

        })
        .addCase(closeBid.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
    }
});

export const {createBid, remuveBid, connectWallet, disconnectWallet, setUserState} = userSlice.actions;

export default userSlice.reducer