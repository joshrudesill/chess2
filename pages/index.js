import { useSelector } from 'react-redux'
import Board from '../components/board'

export default function Home() {
  const activePiece = useSelector(state => state.board.activePiece)
  return (
    <div className='container'>
      <div>
        {activePiece ? `[ ${activePiece.x} , ${activePiece.y} ] --- ${activePiece.type}` : 'NONE'}
        
      </div>
      <Board />
    </div>
  )
}
