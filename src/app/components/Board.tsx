import { EnhancedBoard } from "../lib/types"
import { Cell } from "./Cell"

interface BoardProps {
  board: EnhancedBoard
}
export const Board: React.FC<BoardProps> = ({ board }) => {
  const boardWidth = Math.sqrt(board.length) || 9

  return (
    <div id="sudoku-board" className="mx-auto w-[26rem]">
      <div className="grid grid-cols-9 gap-0 ">
        {board.map((cell) => {
          return <Cell key={cell.index} boardWidth={boardWidth} cell={cell} />
        })}
      </div>
    </div>
  )
}
