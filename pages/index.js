import { useSelector } from 'react-redux'
import Board from '../components/board'

export default function Home() {
  const activePiece = useSelector(state => state.board.activePiece)
  const check = useSelector(state => state.board.kingData.squaresToBeBlocked)
  return (
    <div className='container'>
      <div>
        {activePiece ? `[ ${activePiece.x} , ${activePiece.y} ] --- ${JSON.stringify(activePiece.legalMoves)}` : 'NONE'}<br/>
        {check ? JSON.stringify(check) : 'NOT'}
      </div>
      <Board />
    </div>
  )
}
