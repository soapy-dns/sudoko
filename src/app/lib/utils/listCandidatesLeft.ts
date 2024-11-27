import { EnhancedBoard } from "../types"

interface Props {
  cellIndex: number
  board: EnhancedBoard
}

// This just returns a list of candidates without the nulls FOR A CELL
export const listCandidatesLeft = function ({ cellIndex, board }: Props) {
  const candidates = board.cells[cellIndex].candidates
  const nonNullCandidates = candidates.filter((it) => it !== null)
  return nonNullCandidates
}
