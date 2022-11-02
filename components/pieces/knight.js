import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkKing, setLegalMoves } from "../../features/board/boardSlice";




const Knight = ({ piece }) => {
    const dispatch = useDispatch()
    const board = useSelector(state => state.board.position)
    const kingCalculated = useSelector(state => state.board.kingCalculated)

    const calculateLegalMoves = () => {
        const legalMoves = [ ]
        const { x, y } = piece

        const moves = [

            { x: x + 1, y: y + 2},
            { x: x + 2, y: y + 1},

            { x: x - 1, y: y - 2},
            { x: x - 2, y: y - 1},

            { x: x + 1, y: y - 2},
            { x: x + 2, y: y - 1},

            { x: x - 1, y: y + 2},
            { x: x - 2, y: y + 1},

        ]
        if(!piece.pinned) {

            moves.forEach(m => {
               if(m.x >= 0 && m.x <= 7 && m.y >= 0 && m.y <= 7) {
                    if(board[m.x][m.y].piece !== null && board[m.x][m.y].piece.type === 0) {

                        dispatch(checkKing({ piece: piece, squares: [{ x: piece.x, y: piece.y }]})) 

                    }
                    legalMoves.push({ x: m.x, y: m.y })
               }
           })

        }


        dispatch(setLegalMoves({ piece: piece, moves: legalMoves}))

    }

    useEffect(() => {
        if(!piece.legalMovesUpdated && kingCalculated) {
            calculateLegalMoves()
        }
    }, [piece.legalMovesUpdated, kingCalculated])

    return (
        <div>
            K
        </div>
    )
}


export default Knight;