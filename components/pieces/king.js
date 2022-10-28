import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pinPiece, setLegalMoves } from "../../features/board/boardSlice";


const King = ({ piece }) => {

    const dispatch = useDispatch()
    const board = useSelector(state => state.board.position)
    const activePiece = useSelector(state => state.board.activePiece)

    const calculateLegalMoves = () => {
        var legalMoves = [ ]
        
        // shoot 8 rays in every direction
        // if piece is friendly save it
        // if next piece is piece attacking that piece pin set pinned to true
        // if piece can move in that direction to take the pinned piece then set legalMoves and updatedLegalMoves
        /*
            0 1 2
            7 K 3
            6 5 4
        */

        for(let i = 0; i < 8; i++) {
            var x, y;
            if(i === 0) {x = -1; y = -1;}

            if(i === 1) {x = -1; y =  0;}

            if(i === 2) {x = -1; y =  1;}

            if(i === 3) {x =  0; y =  1;}

            if(i === 4) {x =  1; y =  1;}

            if(i === 5) {x =  1; y =  0;}

            if(i === 6) {x =  1; y = -1;}

            if(i === 7) {x =  0; y = -1;}

            var friendlyHit = false;
            var endLoop    = false;
            var friendlyPiece = null;
            var j = 1

            while(!endLoop) {

                const coords = { x: (j * x) + piece.x, y: (j * y) + piece.y }
                //console.log(`Loop: ${j} FH: ${friendlyHit} Coords: ${coords.x}, ${coords.y} FP: ${friendlyPiece}`)

                if(coords.x >= 0 && coords.x <= 7 && coords.y >= 0 && coords.y <= 7) {

                    const squareData = board[coords.x][coords.y]

                    if(squareData.piece !== null) {
                        
                        const p = squareData.piece;

                        if(friendlyHit) {
                            console.log('1')
                            if(p.white !== piece.white) {
                                //console.log(`enemy hit at: [${p.x} , ${p.y}]`)

                                //check piece type and pin accordingly

                                endLoop = true
                                dispatch(pinPiece({ piece: friendlyPiece, direction: i }))

                            }

                        } else if(p.white === piece.white) {
                            //console.log(`friendly hit at: [${p.x} , ${p.y}]`)
                            friendlyPiece = squareData.piece
                            friendlyHit = true

                        }

                    }

                } else {

                    friendlyHit = true
                    endLoop = true
                    break

                }

                j++

            }

            console.log('=========================')

        }

        dispatch(setLegalMoves({ piece: piece, moves: [] }))

    }

    useEffect(() => {
        if(!piece.legalMovesUpdated) {
            console.log('updating king')
            calculateLegalMoves()
        }
    }, [piece.legalMovesUpdated])

    return (
        <div>
            K{piece.legalMovesUpdated === true ? 't' : 'f'}
        </div>
    )
}

export default King;