import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sessionDetails: {
    sessionID: null,
    userID: null,
    username: null,
    gameID: null,
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
  },
});

export const { setSession, setGame } = appSlice.actions;
export default appSlice.reducer;
