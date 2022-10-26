import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLegalMoves } from "../../features/board/boardSlice";


const King = () => {

    const dispatch = useDispatch()
    const board = useSelector(state => state.board.position)
    const activePiece = useSelector(state => state.board.activePiece)

    const calculateLegalMoves = () => {
        var legalMoves = [ ]

        

    }

    return (
        <div>
            K
        </div>
    )
}

export default King;