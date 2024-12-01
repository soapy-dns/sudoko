import { EnhancedBoard } from "../types"

interface Props {
  board: EnhancedBoard
}
export const updateSingleCandidates = ({ board }: Props) => {
  board.cells.forEach((cell) => {
    if (cell.val) {
      return
    }
    const { candidates } = cell
    if (candidates.length === 1) {
      const [val] = candidates
      cell.val = val
      cell.candidates = []
      board.filledCellCount++
    }
  })
}
