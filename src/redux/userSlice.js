import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName:"",
    userLink: "",
    userId: "",
    rang: 1,
    wallet: "",
    xpPoints: 0,
    refferalFor: "vati",
    balalnce: 0,
    bid: {
        type: "+/-",
        value: 1,
        time: "12:00:05",
    },
    signedAt: Date.now(),
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        createBid: (state, action)=>{
            state.bid = {
                type: action, //вытащить тип и сумму
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
    }
});

export const {createBid, remuveBid, connectWallet, disconnectWallet} = userSlice.actions;

export default userSlice.reducer