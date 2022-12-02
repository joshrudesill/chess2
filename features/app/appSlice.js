import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sessionDetails: {
    sessionID: null,
    userID: null,
    username: null,
    gameID: null,
  },
  inGameData: {
    white: null,
    myTurn: null,
    timer: 0,
    opponentData: {
      username: null,
      timer: 0,
    },
  },
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSession: (state, action) => {
      console.log("setsession");
      const { sid, uid, un, gid } = action.payload;
      state.sessionDetails.sessionID = sid;
      state.sessionDetails.userID = uid;
      state.sessionDetails.username = un;
      state.sessionDetails.gameID = gid;
    },
    setGame: (state, action) => {
      state.sessionDetails.gameID = action.payload;
    },
    setInGameData: (state, action) => {
      const { white, myTurn, timer, opponentData } = action.payload;
      state.inGameData.white = white;
      state.inGameData.myTurn = myTurn;
      state.inGameData.timer = timer;
      state.inGameData.opponentData = opponentData;
    },
  },
});

export const { setSession, setGame } = appSlice.actions;
export default appSlice.reducer;
