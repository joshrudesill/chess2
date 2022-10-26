import { createSlice } from '@reduxjs/toolkit'

var is = []

const pieces = [
    { type: 1, x: 1, y: 1, hasMoved: false, id: 1, white: true, legalMoves: [], captured: false },
    { type: 1, x: 1, y: 2, hasMoved: false, id: 2, white: true, legalMoves: [], captured: false },
    { type: 1, x: 1, y: 3, hasMoved: false, id: 3, white: true, legalMoves: [], captured: false },
    { type: 1, x: 2, y: 3, hasMoved: false, id: 4, white: false, legalMoves: [], captured: false },
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
is[2][3].piece = pieces[3] 

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

            state.position[x][y].piece.hasMoved = true

            state.activePiece = null
        },
        setLegalMoves: (state, action) => {
            const { piece, moves } = action.payload;
            console.log(moves)
            state.position[piece.x][piece.y].piece.legalMoves = moves
        },
        resetLegalMoves: (state, action) => {
            const { x, y } = action.payload;
            state.position[x][y].piece.legalMoves = []
        },
        setActivePiece: ( state, action ) => {
            state.activePiece = action.payload
        },
        resetActivePiece: ( state ) => {
            state.activePiece = null
        },
        capturePiece: (state, action) => {
            const {  toBeCaptured } = action.payload;
            const { x, y } = toBeCaptured;
            state.position[state.activePiece.x][state.activePiece.y].piece = null
            state.position[x][y].piece = state.activePiece

            state.position[x][y].piece.x = x
            state.position[x][y].piece.y = y

            state.position[x][y].piece.hasMoved = true

            state.activePiece = null
        }
    },
})

export const { changePieceAtSquare, setActivePiece, resetActivePiece, setLegalMoves, resetLegalMoves, capturePiece } = boardSlice.actions

export default boardSlice.reducer;