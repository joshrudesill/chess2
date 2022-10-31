import { useSelector } from 'react-redux'
import Board from '../components/board'

export default function Home() {
  const activePiece = useSelector(state => state.board.activePiece)
  const check = useSelector(state => state.board.kingData.inCheck)
  return (
    <div className='container'>
      <div>
        {activePiece ? `[ ${activePiece.x} , ${activePiece.y} ] --- ${JSON.stringify(activePiece.legalMoves)}` : 'NONE'}<br/>
        {check ? 'CHECK': 'NOT'}
      </div>
      <Board />
    </div>
  )
}
