import { createSlice } from '@reduxjs/toolkit'

var is = []

const pieces = [
    { type: 1, x: 1, y: 1, hasMoved: false, id: 1 },
    { type: 1, x: 1, y: 2, hasMoved: false, id: 2 },
    { type: 1, x: 1, y: 3, hasMoved: false, id: 3 },
]

for (let i = 0; i < 8; i++) {
    var ta = []
    for (let j = 0; j < 8; j++) {
        const ota = { id: i+j, x: i, y: j,  piece: null }
        ta.push(ota)
    }
    is.push(ta)
}

is[1][1].piece = pieces[0] 
is[1][2].piece = pieces[1] 
is[1][3].piece = pieces[2] 

const initialState = {
    position: is,
    pieces: pieces,
    activePiece: null
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        changePieceAtSquare: (state, action) => {
            const { x, y } = action.payload;
            state.position[state.activePiece.x][state.activePiece.y].piece = null
            state.position[x][y].piece = state.activePiece

            state.position[x][y].piece.x = x
            state.position[x][y].piece.y = y

            state.activePiece = null
        },
        setActivePiece: ( state, action ) => {
            state.activePiece = action.payload
        },
        resetActivePiece: ( state ) => {
            state.activePiece = null
        }
    },
})

export const { changePieceAtSquare, setActivePiece, resetActivePiece } = boardSlice.actions

export default boardSlice.reducer;