import { createSlice } from "@reduxjs/toolkit";
import boardSlice from "../board/boardSlice";
const initialState = {
  sessionDetails: {
    sessionID: null,
    userID: null,
    username: null,
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
  },
});

export const { setSession } = appSlice.actions;
export default appSlice.reducer;
