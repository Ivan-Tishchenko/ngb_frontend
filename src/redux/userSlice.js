import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    avatarURL: "https://cdn4.cdn-telegram.org/file/cbjNUWBQxSPcj3KU9Nv-B-8ai_Q2F5Z4kdJSvaXdoB6HfSdoAnUksAMPwhCLqGv8kNFwbgHqZMEFU-GnZYZp7MUu9JLoVHCMVvj06Z-MjWPN7N4z_rDgeo_8pfmj-vvTsPtqeGRoLE2lGRy46w-aulq5yAZbG1-ZQdInGG0XfMGCotDk4QS4aeS3Eco9UhkDt-d6mw8WgTvH4P8yPi2lbiAdpabybGJaa1F1yIwQjZZ_ZoomxGTJqzFzTmwi6r6uS2k9NaGcGRtNf8hzA43F7qb5lC_Q4d6fskbpMhD0Dy-4PzGHMmFmyzJfxfUXJvrqn-cpKAi4v-JWBOWSP0h_KQ.jpg",
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