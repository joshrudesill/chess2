import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "/features/board/boardSlice";
import appReducer from "/features/app/appSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    app: appReducer,
  },
  devTools: true,
});
