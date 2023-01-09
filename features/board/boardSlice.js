import { createSlice } from "@reduxjs/toolkit";
import socket from "../../socket";
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
/*

/*
    0 - King
    1 - Pawn
    2 - Rook
    3 - Bishop
    4 - Knight
    5 - Queen


const pieces = [
  {
    type: 4,
    x: 1,
    y: 1,
    hasMoved: false,
    id: 1,
    white: true,
    legalMoves: [],
    captured: false,
    legalMovesUpdated: false,
    pinned: false,
    pinDirection: null,
  },
  {
    type: 2,
    x: 1,
    y: 2,
    hasMoved: false,
    id: 200,
    white: true,
    legalMoves: [],
    captured: false,
    legalMovesUpdated: false,
    pinned: false,
    pinDirection: null,
  },
  {
    type: 5,
    x: 3,
    y: 3,
    hasMoved: false,
    id: 300,
    white: false,
    legalMoves: [],
    captured: false,
    legalMovesUpdated: false,
    pinned: false,
    pinDirection: null,
  },
  {
    type: 2,
    x: 3,
    y: 4,
    hasMoved: false,
    id: 4,
    white: false,
    legalMoves: [],
    captured: false,
    legalMovesUpdated: false,
    pinned: false,
    pinDirection: null,
  },
  {
    type: 0,
    x: 4,
    y: 4,
    hasMoved: false,
    id: 5,
    white: false,
    legalMoves: [],
    captured: false,
    legalMovesUpdated: false,
    pinned: false,
    pinDirection: null,
  },
];



is[1][1].piece = pieces[0];
is[1][2].piece = pieces[1];
is[3][3].piece = pieces[2];
is[3][4].piece = pieces[3];
is[4][4].piece = pieces[4];
*/
var is = [];
for (let i = 0; i < 8; i++) {
  var ta = [];
  for (let j = 0; j < 8; j++) {
    const ota = { id: i + j, x: i, y: j, piece: null };
    ta.push(ota);
  }
  is.push(ta);
}
const initialState = {
  position: is,
  activePiece: null,
  whiteKingCalculated: false,
  blackKingCalculated: false,
  kingLocations: [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ], //white , black
  currentTimerOffset: {
    white: 0,
    black: 0,
  },
  startTime: null,
  white: null,
  moveInTime: null,
  kingData: {
    inCheck: false,
    checkingPiece: null,
    squaresToBeBlocked: [],
    white: null,
  },
  firstMove: true,
  myTurn: null,
};

// search all legal moves and remove any not in sqauresToBeBlocked

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setTimerOffset: (state, action) => {
      const { offsetW, offsetB } = action.payload;
      state.currentTimerOffset.white = offsetW;
      state.currentTimerOffset.black = offsetB;
    },
    setMoveInTime: (state, action) => {
      state.moveInTime = action.payload;
    },
    setWhite: (state, action) => {
      state.white = action.payload;
    },
    setFirstMove: (state) => {
      state.firstMove = false;
    },
    setGameStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setMyTurn: (state, action) => {
      state.myTurn = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;

      state.whiteKingCalculated = false;
      state.blackKingCalculated = false;
      state.position.forEach((r) => {
        r.forEach((s) => {
          if (s.piece !== null) {
            s.piece.legalMovesUpdated = false;
            s.piece.pinned = false;
            s.piece.pinDirection = null;
          }
        });
      });
    },
    changePieceAtSquare: (state, action) => {
      state.myTurn = false;

      const { x, y } = action.payload;
      state.position[state.activePiece.x][state.activePiece.y].piece = null;
      state.position[x][y].piece = state.activePiece;

      state.position[x][y].piece.x = x;
      state.position[x][y].piece.y = y;

      state.position[x][y].piece.hasMoved = true;

      state.activePiece = null;

      state.kingData = initialState.kingData;
      if (state.firstMove) {
        state.firstMove = false;
        socket.emit("firstMove", state.position);
      } else {
        socket.emit(
          "pieceMove",
          state.position,
          state.startTime,
          state.moveInTime
        );
      }
    },
    resetPieceState: (state) => {
      state.whiteKingCalculated = false;
      state.blackKingCalculated = false;
      state.position.forEach((r) => {
        r.forEach((s) => {
          if (s.piece !== null) {
            s.piece.legalMovesUpdated = false;
            s.piece.pinned = false;
            s.piece.pinDirection = null;
          }
        });
      });
    },
    setLegalMoves: (state, action) => {
      const { piece, moves } = action.payload;
      state.position[piece.x][piece.y].piece.legalMovesUpdated = true;
      state.position[piece.x][piece.y].piece.legalMoves = moves;
    },
    removeLegalMovesFromKing: (state, action) => {
      const { white, moves } = action.payload;
      const kingPos = !white
        ? [state.kingLocations[0].x, state.kingLocations[0].y]
        : [state.kingLocations[1].x, state.kingLocations[1].y];

      let newMoves = [];
      const legalmoves =
        state.position[kingPos[0]][kingPos[1]].piece.legalMoves;
      console.log(
        legalmoves.map((e) => {
          return { x: e.x, y: e.y };
        })
      );
      console.log(moves);
      console.log("--------");
      if (legalmoves.length > 0) {
        for (const move of legalmoves) {
          if (
            !moves.some((m) => {
              if (m.x === move.x && m.y === move.y) {
                return true;
              }
              return false;
            })
          ) {
            newMoves.push({ x: move.x, y: move.y });
          }
        }
      }
      console.log(newMoves);
      state.position[kingPos[0]][kingPos[1]].piece.legalMoves = newMoves;
    },
    changeKingLocation: (state, action) => {
      console.log("king location changed");
      const { white, position } = action.payload;
      state.kingLocations[white ? 0 : 1] = position;
    },
    resetLegalMoves: (state, action) => {
      const { x, y } = action.payload;
      state.position[x][y].piece.legalMoves = [];
    },
    setActivePiece: (state, action) => {
      state.activePiece = action.payload;
    },
    resetActivePiece: (state) => {
      state.activePiece = null;
    },
    capturePiece: (state, action) => {
      state.myTurn = false;
      const { toBeCaptured } = action.payload;
      const { x, y } = toBeCaptured;
      state.position[state.activePiece.x][state.activePiece.y].piece = null;
      state.position[x][y].piece = state.activePiece;

      state.position[x][y].piece.x = x;
      state.position[x][y].piece.y = y;

      state.position[x][y].piece.hasMoved = true;

      state.activePiece = null;

      state.kingData = initialState.kingData;
      socket.emit(
        "pieceMove",
        state.position,
        state.startTime,
        state.moveInTime
      );
    },
    pinPiece: (state, action) => {
      const { piece, direction } = action.payload;
      const { x, y } = piece;
      state.position[x][y].piece.pinned = true;
      state.position[x][y].piece.pinDirection = direction;
    },
    setKingCalculated: (state, action) => {
      action.payload
        ? (state.whiteKingCalculated = true)
        : (state.blackKingCalculated = true);
    },
    checkKing: (state, action) => {
      console.log(
        "checking king ",
        action.payload.piece.x,
        action.payload.piece.y
      );
      state.kingData.inCheck = true;
      state.kingData.checkingPiece = action.payload.piece;
      state.kingData.squaresToBeBlocked = action.payload.squares;
      state.kingData.white = !action.payload.piece.white;
    },
    recheckLegalMoves: (state) => {
      const foundOneLegalMove = false;
      //add checkmate logic here
      state.position.forEach((r) => {
        r.forEach((s) => {
          if (
            s.piece !== null &&
            s.piece.white === state.kingData.white &&
            s.piece.type !== 0
          ) {
            const newMoves = s.piece.legalMoves.filter((m) => {
              if (
                state.kingData.squaresToBeBlocked.some((j) => {
                  if (m.x === j.x && m.y === j.y) {
                    foundOneLegalMove = true;
                    return true;
                  }
                  return false;
                })
              ) {
                return true;
              }
              return false;
            });
            s.piece.legalMoves = newMoves;
          }
        });
      });

      if (!foundOneLegalMove) {
        const kingPos = state.kingData.white
          ? [state.kingLocations[0].x, state.kingLocations[0].y]
          : [state.kingLocations[1].x, state.kingLocations[1].y];
        const king = state.position[kingPos[0]][kingPos[1]].piece;
        if (!king.legalMoves.length > 0) {
          if (state.myTurn) {
            //socket.emit("endGame", "checkmate");
          }
          console.log(
            state.kingData.white ? "white " : "black ",
            "king checkmated"
          );
        }
      }
    },
  },
});

export const {
  changePieceAtSquare,
  setActivePiece,
  resetActivePiece,
  setLegalMoves,
  resetLegalMoves,
  capturePiece,
  pinPiece,
  setKingCalculated,
  checkKing,
  recheckLegalMoves,
  setPosition,
  setGameStartTime,
  setTimerOffset,
  setWhite,
  setFirstMove,
  setMyTurn,
  setMoveInTime,
  resetPieceState,
  removeLegalMovesFromKing,
  changeKingLocation,
} = boardSlice.actions;

export default boardSlice.reducer;
