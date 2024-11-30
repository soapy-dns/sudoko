import { RawBoard, EnhancedBoard } from "../types"
import { getBoxIndex } from "../utils"
import { getAllCandidates } from "./utils"

export const initBoard = (board: RawBoard): EnhancedBoard => {
  const boardSize = board.length
  const boardWidth = Math.sqrt(boardSize) || 9
  const boxWidth = Math.sqrt(boardWidth) || 3
  const allCandidates = getAllCandidates(boardWidth)

  const enhancedBoard: EnhancedBoard = { size: boardSize, width: boardWidth, cells: [], allCandidates }

  //enhance board to handle candidates, and possibly other params
  for (let j = 0; j < boardSize; j++) {
    const cellVal = board[j]
    const x = j % boardWidth
    const y = Math.floor(j / boardWidth)
    const candidates = cellVal ? [] : [...allCandidates]

    const enhancedCell = {
      index: j,
      val: cellVal,
      candidates: candidates,
      coord: { x, y },
      boxIndex: getBoxIndex(x, y, boxWidth)
      //title: "" possibl add in 'A1. B1...etc
    }
    enhancedBoard.cells.push(enhancedCell)
  }

  return enhancedBoard
}
