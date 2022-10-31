import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLegalMoves, checkKing } from "../../features/board/boardSlice";


const Queen = ({ piece }) => {

    const dispatch = useDispatch()
    const board = useSelector(state => state.board.position)
    const kingCalculated = useSelector(state => state.board.kingCalculated)

    const calculateLegalMoves = () => {
        var legalMoves = [ ]
        
        /* 

           

        */
        
        for(let i = 0; i < 4; i++) {
            let x, y
            const diagonals = [ 0, 2, 4, 6 ]
            let checkedSquares = []

            if(piece.pinned) {
            
                if(diagonals.includes(piece.pinDirection)) {
                
                    if(i === 0 && piece.pinDirection === 0) { x = -1; y = -1 } 
                    else if(i === 1 && piece.pinDirection === 2) { x = -1; y =  1 }
                    else if(i === 2 && piece.pinDirection === 4) { x =  1; y =  1 } 
                    else if(i === 3 && piece.pinDirection === 6) { x =  1; y = -1 } 
                    else { x = -100; y = -100 }
                }
            
            } else {

                if(i === 0) { x = -1; y = -1 }
                if(i === 1) { x = -1; y =  1 }
                if(i === 2) { x =  1; y =  1 }
                if(i === 3) { x =  1; y = -1 }
                
            }

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

                            if(p.type === 0) {

                                dispatch(checkKing({ piece: piece, squares: checkedSquares }))
                                pieceHit = true
                                
                            } else {
                                
                                legalMoves.push({ x: coords.x, y: coords.y })
                                pieceHit = true

                            }

                        }

                    } else if(squareData.piece === null) {

                        checkedSquares.push( { x: coords.x, y: coords.y } )
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

            let x = 0
            let y = 0

            const files = [ 1, 3, 5, 7 ]
            let checkedSquares = []

            if(piece.pinned) {
            
                if(files.includes(piece.pinDirection)) {
                    
                    if(i === 0 && piece.pinDirection === 1)      { x = -1 } 
                    else if(i === 1 && piece.pinDirection === 3) { x =  1 } 
                    else if(i === 2 && piece.pinDirection === 5) { x =  1 } 
                    else if(i === 3 && piece.pinDirection === 7) { x = -1 } 
                    else                                         { x = -100; y = -100 }

                } else {

                    x = -101; 
                    y = -101

                }
            
            } else {

                if(i === 0) { x = -1 }
                if(i === 1) { y =  1 }
                if(i === 2) { x =  1 }
                if(i === 3) { y = -1 }

            }

            let pieceHit = false;
            let j = 1;
            
            while(!pieceHit) {
                //console.log('calc: ' , piece.id)
                const coords = { x: (j * x) + piece.x, y: (j * y) + piece.y }

                if(coords.x >= 0 && coords.x <= 7 && coords.y >= 0 && coords.y <= 7) {

                    const squareData = board[coords.x][coords.y]

                    if(squareData.piece !== null) {
                        
                        const p = squareData.piece;

                        if(p.white === piece.white) {
                            pieceHit = true

                        } else if(p.white !== piece.white) {

                            if(p.type === 0) {

                                dispatch(checkKing({ piece: piece, squares: checkedSquares }))
                                pieceHit = true
                                
                            } else {
                                
                                legalMoves.push({ x: coords.x, y: coords.y })
                                pieceHit = true

                            }

                        }

                    } else if(squareData.piece === null) {

                        checkedSquares.push( { x: coords.x, y: coords.y } )
                        legalMoves.push( { x: coords.x, y: coords.y } )

                    }

                } else {

                    pieceHit = true
                    break 

                }

                j = j + 1
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