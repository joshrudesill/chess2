import { useDispatch, useSelector } from "react-redux";
import { changePieceAtSquare, setActivePiece, resetActivePiece, capturePiece } from "../features/board/boardSlice";
import Pawn from "./pieces/pawn";

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
    return (
        <div 
            className={`column is-clickable is-unselectable is-1 p-auto ${ color % 2 === 0 ? 'has-background-primary' : ''}`} 
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
            style={{width: '50px', height: '50px'}}
        >
           {squareData.piece !== null ? <Pawn piece={squareData.piece} /> : ' '}
        </div>
    )
} 

export default BoardSquare;