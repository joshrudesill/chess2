import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    activePiece: null,
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setActivePiece: ( state, action ) => {
            state.activePiece = action.payload
        },
        resetActivePiece: ( ) => initialState
    },
})

export const { setActivePiece, resetActivePiece } = playerSlice.actions

export default playerSlice.reducer;