import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLegalMoves } from "../../features/board/boardSlice";


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
            if(i === 0) x = -1; y = -1;
            if(i === 1) x = -1; y =  0;
            if(i === 2) x = -1; y =  1;

            if(i === 3) x =  0; y =  1;

            if(i === 4) x =  1; y =  1;
            if(i === 5) x =  1; y =  0;
            if(i === 6) x =  1; y = -1;

            if(i === 7) x =  0; y = -1;

            var friendlyHit = false;
            var enemyHit    = false;
            var i = 1

            while(!friendlyHit && !enemyHit) {

                const coords = { x: (i * x) + piece.x, y: (i * y) + piece.y }


                if(coords.x >= 0 && coords.x <= 7 && coords.y >= 0 && coords.y <= 7) {

                    const squareData = board[coords.x][coords.y]
                    



                } else {

                    friendlyHit = true
                    enemyHit = true
                    break

                }

            }

        }
        
        

    }

    return (
        <div>
            K
        </div>
    )
}

export default King;