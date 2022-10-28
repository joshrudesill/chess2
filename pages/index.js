import { useSelector } from 'react-redux'
import Board from '../components/board'

export default function Home() {
  const activePiece = useSelector(state => state.board.activePiece)
  const pieces = useSelector(state => state.board.pieces)
  return (
    <div className='container'>
      <div>
        {activePiece ? `[ ${activePiece.x} , ${activePiece.y} ] --- ${activePiece.type}` : 'NONE'}<br/>
        {JSON.stringify(pieces)}
      </div>
      <Board />
    </div>
  )
}
