import { createSlice } from "@reduxjs/toolkit";
import setUser from "./userActionsThunks";

const initialState = {
    userAvatarURL: null,
    userName: window.Telegram?.WebApp.tg.initDataUnsafe.user.first_name + window.Telegram?.WebApp.tg.initDataUnsafe.user.last_name,
    userLink: window.Telegram?.WebApp.tg.initDataUnsafe.user.username,
    userId: window.Telegram?.WebApp.tg.initDataUnsafe.user.id,
    rang: 1,
    wallet: null,
    xpPoints: 0,
    ballance: 0,
    tickets: 0,
    bid: {
    },
    reffCode: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        createBid: (state, action)=>{
            state.bid = {
                type: action, // вытащить тип и сумму
                time: Date.now(),
            }
        },
        remuveBid: (state, action)=> {
            state.bid = null;
        },
        connectWallet: (state, action) => {
            state.wallet = "вытащить кошельок";
        },
        disconnectWallet: (state, action) => {
            state.wallet = null;
        },
    },
    extraReducers: (builder) => {
    builder
        .addCase(setUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(setUser.fulfilled, (state, action)=>{
            const { userId, username, first_name, last_name, rang, wallet, xpPoints, reffCode, ballance, tickets, bid } = action.payload;
            state.userName = first_name + last_name;
            state.ballance = ballance;
            state.userId = userId;
            state.userLink = username;
            state.rang = rang;
            state.wallet = wallet;
            state.xpPoints = xpPoints;
            state.reffCode = reffCode;
            state.tickets = tickets;
            state.bid = bid;
        })
        .addCase(setUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке данных';
        })
    }
});

export const {createBid, remuveBid, connectWallet, disconnectWallet, setUserState} = userSlice.actions;

export default userSlice.reducer