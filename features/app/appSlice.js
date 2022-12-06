import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sessionDetails: {
    sessionID: null,
    userID: null,
    username: null,
    gameID: null,
  },
  inGameData: {
    gameType: null,
    white: null,
    myTurn: null,
    gameStarted: false,

    opponentData: {
      username: null,
      connected: false,
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
      const { gameType, white, myTurn, startTime, opponentData } =
        action.payload;
      state.inGameData.gameType = gameType;
      state.inGameData.white = white;
      state.inGameData.myTurn = myTurn;
      state.inGameData.startTime = startTime;
      state.inGameData.opponentData = opponentData;
    },
    setGameStarted: (state) => {
      state.inGameData.gameStarted = true;
    },
    setMyTurn: (state, action) => {
      state.myTurn = action.payload;
    },
  },
});

export const { setSession, setGame, setInGameData, setGameStarted, setMyTurn } =
  appSlice.actions;
export default appSlice.reducer;
