import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sessionDetails: {
    sessionID: null,
    userID: null,
    username: null,
    inGame: false,
    gameID: null,
  },
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSession: (state, action) => {
      const { sid, uid, un, gid, ig } = action.payload;
      state.sessionDetails.sessionID = sid;
      state.sessionDetails.userID = uid;
      state.sessionDetails.username = un;
      state.sessionDetails.gameID = gid;
      state.sessionDetails.inGame = ig;
    },
    setGame: (state, action) => {
      state.sessionDetails.gameID = action.payload;
      state.sessionDetails.inGame = true;
    },
  },
});

export const { setSession, setGame } = appSlice.actions;
export default appSlice.reducer;