import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sessionDetails: {
    sessionID: null,
    userID: null,
    username: null,
    gameID: null,
  },
  ping: 0,
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
      const { gameType, white, startTime, opponentData } = action.payload;
      state.inGameData.gameType = gameType;
      state.inGameData.white = white;
      state.inGameData.startTime = startTime;
      state.inGameData.opponentData = opponentData;
    },
    setGameStarted: (state) => {
      state.inGameData.gameStarted = true;
    },
    endGame: (state) => {
      state.inGameData.gameStarted = true;
      state.inGameData.myTurn = false;
      state.sessionDetails.gameID = null;
      state.inGameData = initialState.inGameData;
      y;
    },
    setMyTurn: (state, action) => {
      state.inGameData.myTurn = action.payload;
    },
    setPing: (state, action) => {
      state.ping = action.payload;
    },
    setOpponentConnection: (state, action) => {
      state.inGameData.opponentData.connected = action.payload;
    },
  },
});

export const {
  setSession,
  setGame,
  setInGameData,
  setGameStarted,
  setMyTurn,
  setPing,
  setOpponentConnection,
  endGame,
} = appSlice.actions;
export default appSlice.reducer;
