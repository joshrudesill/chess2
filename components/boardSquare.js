import { useDispatch, useSelector } from "react-redux";
import { changePieceAtSquare, setActivePiece, resetActivePiece } from "../features/board/boardSlice";

const BoardSquare = ({ squareData, color }) => {
    const dispatch = useDispatch()
    const activePiece = useSelector(state => state.board.activePiece)

    const onMouseDown = () => {
        
        if(activePiece === null && squareData.piece !== null) {

            dispatch(setActivePiece(squareData.piece))

        } else if(activePiece && squareData.piece === null) {

            dispatch(changePieceAtSquare(squareData))

        }

    }

    const onMouseUp = () => {

        if(activePiece !== null && squareData.piece === null) {

            dispatch(changePieceAtSquare(squareData))

        }

    }
// pieces into components which handle available moves property
    return (
        <div 
            className={`column is-clickable is-unselectable is-1 ${ color % 2 === 0 ? 'has-background-primary' : ''}`} 
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
        >
            {
                squareData.piece ? squareData.piece.type : '0'
            }
            {
                squareData.piece ? squareData.x : ''
            }
            {
                squareData.piece ? squareData.y : ''
            }
        </div>
    )
} 

export default BoardSquare;