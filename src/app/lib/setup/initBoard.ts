import { Board, EnhancedBoard } from "../types"
import { getBoxIndex } from "../utils"
import { getAllCandidates, getNullCandidates } from "./utils"

export const initBoard = (board: Board): EnhancedBoard => {
  const boardSize = board.length
  const boardWidth = Math.sqrt(boardSize) || 9
  const boxWidth = Math.sqrt(boardWidth) || 3

  const enhancedBoard: EnhancedBoard = { size: boardSize, width: boardWidth, cells: [] }

  const nullCandidateList = getNullCandidates(boardWidth)
  const allCandidates = getAllCandidates(boardWidth)

  //enhance board to handle candidates, and possibly other params
  for (let j = 0; j < boardSize; j++) {
    const cellVal = board[j]
    const x = j % boardWidth
    const y = Math.floor(j / boardWidth)
    const candidates = cellVal ? [...nullCandidateList] : [...allCandidates] // if it's unknown, the candidates (at this time) are all numbers

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
