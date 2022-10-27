import { useDispatch, useSelector } from "react-redux";
import { changePieceAtSquare, setActivePiece, resetActivePiece, capturePiece } from "../features/board/boardSlice";
import King from "./pieces/king";
import Pawn from "./pieces/pawn";
import Rook from "./pieces/rook";

const BoardSquare = ({ squareData, color }) => {
    const dispatch = useDispatch()
    const activePiece = useSelector(state => state.board.activePiece)

    const onMouseDown = () => {
        
        if(activePiece === null && squareData.piece !== null) {

            dispatch(setActivePiece(squareData.piece))

        } else if(activePiece && squareData.piece === null) {

            if(activePiece.legalMoves.some(e => {
                if(e.x === squareData.x && e.y == squareData.y) {
                    return true
                }
                return false
            })) {
                dispatch(changePieceAtSquare(squareData))
            }

        } else if(activePiece && squareData.piece && activePiece.white === squareData.piece.white) {
            
            dispatch(setActivePiece(squareData.piece))

        } else if(activePiece && squareData.piece && activePiece.white !== squareData.piece.white) {

            if(activePiece.legalMoves.some(e => {
                if(e.x === squareData.x && e.y == squareData.y) {
                    return true
                }
                return false
            })) {
                dispatch(capturePiece({ toBeCaptured: squareData.piece}))
            }

        }

    }

    const onMouseUp = () => {

        if(activePiece !== null && squareData.piece === null) {
            if(activePiece.legalMoves.some(e => {
                if(e.x === squareData.x && e.y == squareData.y) {
                    return true
                }
                return false
            })) {
                dispatch(changePieceAtSquare(squareData))
            }

        } else if(activePiece && squareData.piece && activePiece.white !== squareData.piece.white) {
            if(activePiece.legalMoves.some(e => {
                if(e.x === squareData.x && e.y == squareData.y) {
                    return true
                }
                return false
            })) {
                dispatch(capturePiece({ toBeCaptured: squareData.piece}))
            }
        }

    }
// pieces into components which handle available moves property

/*
    0 - King
    1 - Pawn
    2 - Rook
    3 - Bishop
    4 - Knight
    5 - Queen
*/ 

    if(squareData.piece !== null && squareData.piece.type === 2) {
        return (
            <div 
                className={`column is-clickable is-unselectable is-1 p-auto ${ color % 2 === 0 ? 'has-background-primary' : ''}`} 
                onMouseDown={ onMouseDown }
                onMouseUp={ onMouseUp }
                style={{width: '50px', height: '50px'}}
            >
               <Rook piece={squareData.piece} />
            </div>
        )
    }
    if(squareData.piece !== null && squareData.piece.type === 1) {
        return (
            <div 
                className={`column is-clickable is-unselectable is-1 p-auto ${ color % 2 === 0 ? 'has-background-primary' : ''}`} 
                onMouseDown={ onMouseDown }
                onMouseUp={ onMouseUp }
                style={{width: '50px', height: '50px'}}
            >
               <Pawn piece={squareData.piece} />
            </div>
        )
    }
    if(squareData.piece !== null && squareData.piece.type === 0) {
        return (
            <div 
                className={`column is-clickable is-unselectable is-1 p-auto ${ color % 2 === 0 ? 'has-background-primary' : ''}`} 
                onMouseDown={ onMouseDown }
                onMouseUp={ onMouseUp }
                style={{width: '50px', height: '50px'}}
            >
               <King piece={squareData.piece} />
            </div>
        )
    }
    if(squareData.piece == null) {
        return (
            <div 
                className={`column is-clickable is-unselectable is-1 p-auto ${ color % 2 === 0 ? 'has-background-primary' : ''}`} 
                onMouseDown={ onMouseDown }
                onMouseUp={ onMouseUp }
                style={{width: '50px', height: '50px'}}
            >
            </div>
        )
    }
} 

export default BoardSquare;