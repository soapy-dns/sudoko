import { useContext } from "react"
import { Cell } from "./Cell"
import { BoardContext } from "../ui/context/BoardProvider"

export const Board: React.FC = () => {
  const { board } = useContext(BoardContext)
  const { width } = board

  return (
    <div id="sudoku-board" className="mx-auto w-[26rem]">
      <div className="grid grid-cols-9 gap-0 ">
        {board.cells.map((cell) => {
          return <Cell key={cell.index} boardWidth={width} cell={cell} />
        })}
      </div>
    </div>
  )
}
