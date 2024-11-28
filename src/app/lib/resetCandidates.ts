import { getAllCandidates } from "./setup/utils"
import { EnhancedBoard } from "./types"

// This is a bit quick and dirty. We shouldn't need to reset all the candidates.
// Not sure we want to go down this candidate path anyway.
export const resetCandidates = (board: EnhancedBoard) => {
  const { size, width } = board

  const allCandidates = getAllCandidates(width)

  for (let j = 0; j < size; j++) {
    const cell = board.cells[j]
    const { val: cellVal } = cell
    const candidates = cellVal ? [] : [...allCandidates] // if it's unknown, the candidates (at this time) are all numbers

    cell.candidates = candidates
  }
}
