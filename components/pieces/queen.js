import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLegalMoves } from "../../features/board/boardSlice";


const Queen = ({ piece }) => {

    const dispatch = useDispatch()
    const board = useSelector(state => state.board.position)
    const kingCalculated = useSelector(state => state.board.kingCalculated)

    const calculateLegalMoves = () => {
        var legalMoves = [ ]
        
        /* 

           

        */

        for(let i = 0; i < 4; i++) {

            var x, y

            if(i === 0) { x = -1; y = -1 }
            if(i === 1) { x = -1; y =  1 }
            if(i === 2) { x =  1; y =  1 }
            if(i === 3) { x =  1; y = -1 }

            var pieceHit = false;
            var j = 1;
            while(!pieceHit) {

                const coords = { x: (j * x) + piece.x, y: (j * y) + piece.y }

                if(coords.x >= 0 && coords.x <= 7 && coords.y >= 0 && coords.y <= 7) {

                    const squareData = board[coords.x][coords.y]

                    if(squareData.piece !== null) {
                        
                        const p = squareData.piece;

                        if(p.white === piece.white) {

                            pieceHit = true

                        } else if(p.white !== piece.white) {

                            legalMoves.push({ x: coords.x, y: coords.y })
                            pieceHit = true

                        }

                    } else if(squareData.piece === null) {

                        legalMoves.push( { x: coords.x, y: coords.y } )

                    }

                } else {

                    pieceHit = true
                    break 

                }

                j+=1
            }
        }

        for(let i = 0; i < 4; i++) {

            var x = 0
            var y = 0

            if(i === 0) { x = -1 }
            if(i === 1) { y =  1 }
            if(i === 2) { x =  1 }
            if(i === 3) { y = -1 }

            var pieceHit = false;
            var j = 1;
            while(!pieceHit) {

                const coords = { x: (j * x) + piece.x, y: (j * y) + piece.y }

                if(coords.x >= 0 && coords.x <= 7 && coords.y >= 0 && coords.y <= 7) {

                    const squareData = board[coords.x][coords.y]

                    if(squareData.piece !== null) {
                        
                        const p = squareData.piece;

                        if(p.white === piece.white) {

                            pieceHit = true

                        } else if(p.white !== piece.white) {

                            legalMoves.push({ x: coords.x, y: coords.y })
                            pieceHit = true

                        }

                    } else if(squareData.piece === null) {

                        legalMoves.push( { x: coords.x, y: coords.y } )

                    }

                } else {

                    pieceHit = true
                    break 

                }

                j+=1
            }
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
            Q
        </div>
    )
}

export default Queen;