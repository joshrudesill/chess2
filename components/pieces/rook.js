import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLegalMoves } from "../../features/board/boardSlice";


const Rook = ({ piece }) => {

    const dispatch = useDispatch()
    const board = useSelector(state => state.board.position)
    const activePiece = useSelector(state => state.board.activePiece)

    const calculateLegalMoves = () => {
        var legalMoves = [ ]
        const { x, y } = piece
        for(let i = 0; i < 4; i++) {
            var pieceHit = false;
            var count = 1;
            while(!pieceHit) {
                if(i === 0) {
                    if(x + count <= 7) {
                        if(board[x+count][y].piece !== null) {
                            if(board[x+count][y].piece.white !== piece.white) {
                                legalMoves.push({ x: x+count, y: y })
                                pieceHit = true
                            }
                            pieceHit = true
                        } else {
                            legalMoves.push({ x: x+count, y: y })
                        }
                    } else {
                        pieceHit = true 
                        break
                    }
                }
                if(i === 1) {
                    if(x - count >= 0) {
                        if(board[x-count][y].piece !== null) {
                            if(board[x-count][y].piece.white !== piece.white) {
                                legalMoves.push({ x: x-count, y: y })
                                pieceHit = true
                            }
                            pieceHit = true
                        } else {
                            legalMoves.push({ x: x-count, y: y })
                        }
                    } else {
                        pieceHit = true 
                        break
                    }
                }

                if(i === 2) {
                    if(y + count <= 7) {
                        if(board[x][y+count].piece !== null) {
                            if(board[x][y+count].piece.white !== piece.white) {
                                legalMoves.push({ x: x, y: y+count })
                                pieceHit = true
                            }
                            pieceHit = true
                        } else {
                            legalMoves.push({ x: x , y: y+count })
                        }
                    } else {
                        pieceHit = true 
                        break
                    }
                }
                if(i === 3) {
                    if(y - count >= 0) {
                        if(board[x][y-count].piece !== null) {
                            if(board[x][y-count].piece.white !== piece.white) {
                                legalMoves.push({ x: x, y: y-count })
                                pieceHit = true
                            }
                            pieceHit = true
                        } else {
                            legalMoves.push({ x: x , y: y-count })
                        }
                    } else {
                        pieceHit = true 
                        break
                    }
                } 
                count+=1
            }
        }



        dispatch(setLegalMoves({ piece: piece, moves: legalMoves}))

    }

    useEffect(() => {
        if(!piece.legalMovesUpdated) {
            calculateLegalMoves()
        }
    }, [piece.legalMovesUpdated])

    return (
        <div>
            R
        </div>
    )
}

export default Rook;