import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName:"vati",
    userLink: "@vati5",
    userId: "7651520",
    rang: 1,
    wallet: "EQ...Baxka",
    xpPoints: 132,
    refferalFor: "F23rfW4fvc",
    ballance: 100,
    tickets: 161,
    bid: {
        type: "+",
        bidId: "CD4wfvd",
        value: 25,
        startTime: Date.now(),
        startPrice: 2.81,
        endTime: null,
    },
    signedAt: Date.now(),
    reffCode: "F23rfW4fvc",
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