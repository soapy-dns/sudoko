import { Board, EnhancedBoard } from "../types"
import { getBoxIndex } from "../utils"

export const initBoard = (board: Board): EnhancedBoard => {
  //   const alreadyEnhanced = board[0] !== null && typeof board[0] === "object"
  const boardSize = board.length
  const boardWidth = Math.sqrt(boardSize) || 9
  const boxWidth = Math.sqrt(boardWidth) || 3

  const nullCandidateList = []
  const boardNumbers = []
  const enhancedBoard: EnhancedBoard = []
  //   $board.attr("data-board-size", boardSize)
  //   if (boardSize % 1 !== 0 || Math.sqrt(boardSize) % 1 !== 0) {
  //     console.log("invalid boardSize: " + boardSize)
  //     // if (typeof opts.boardErrorFn === "function") opts.boardErrorFn({ msg: "invalid board size" })
  //     return
  //   }
  for (let i = 0; i < boardWidth; i++) {
    boardNumbers.push(i + 1) // all possible numbers in a row / column / box
    nullCandidateList.push(null)
  }

  //   if (!alreadyEnhanced) {
  //enhance board to handle candidates, and possibly other params
  for (let j = 0; j < boardSize; j++) {
    const cellVal = board[j]
    const x = j % boardWidth
    const y = Math.floor(j / boardWidth)
    const candidates = cellVal ? [...nullCandidateList] : [...boardNumbers] // if it's unknown, the candidates (at this time) are all numbers

    const enhancedCell = {
      index: j,
      val: cellVal,
      candidates: candidates,
      coord: { x, y },
      boxIndex: getBoxIndex(x, y, boxWidth)
      //title: "" possibl add in 'A1. B1...etc
    }
    enhancedBoard.push(enhancedCell)
  }

  return enhancedBoard
}
