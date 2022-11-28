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
      const { sid, uid, un } = action.payload;
      state.sessionDetails.sessionID = sid;
      state.sessionDetails.userID = uid;
      state.sessionDetails.username = un;
    },
    setGame: (state, action) => {
      state.sessionDetails.gameID = action.payload;
    },
  },
});

export const { setSession, setGame } = appSlice.actions;
export default appSlice.reducer;
