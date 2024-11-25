import { getAllCandidates, getNullCandidates } from "./setup/utils"
import { EnhancedBoard } from "./types"

// This is a bit quick and dirty. We shouldn't need to reset all the candidates.
// Not sure we want to go down this candidate path anyway.
export const resetCandidates = (board: EnhancedBoard) => {
  const boardSize = board.length
  const boardWidth = Math.sqrt(boardSize)

  const nullCandidateList = getNullCandidates(boardWidth)
  const allCandidates = getAllCandidates(boardWidth)

  for (let j = 0; j < boardSize; j++) {
    const cell = board[j]
    const { val: cellVal } = cell
    const candidates = cellVal ? [...nullCandidateList] : [...allCandidates] // if it's unknown, the candidates (at this time) are all numbers

    cell.candidates = candidates
  }
}
