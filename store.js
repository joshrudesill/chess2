import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '/features/counter/counter'
import boardReducer from '/features/board/boardSlice'
import playerReducer from '/features/player/playerSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        board: boardReducer,
    },
});