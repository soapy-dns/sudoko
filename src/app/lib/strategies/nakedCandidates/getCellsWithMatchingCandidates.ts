import { EnhancedBoard, EnhancedCell } from "../../types"
import { getMatchingCells } from "../../utils/getMatchingCells"

interface Props {
  numOfCandidates: number
  board: EnhancedBoard
  cellIndices: number[] // indices for a row / col / box
}

// TODO:
export const getCellsWithMatchingCandidates = ({ board, cellIndices, numOfCandidates }: Props): EnhancedCell[] => {
  const relevantCells = cellIndices.map((it) => {
    return board.cells[it]
  })

  const cellsWithXCandidates = relevantCells.filter((cell) => {
    return !cell.val && cell.candidates.length === numOfCandidates
  })

  const matchingCellIndices = getMatchingCells({ cells: cellsWithXCandidates, startIndex: 0 })

  const matchingCells = matchingCellIndices.map((it) => board.cells[it])

  return matchingCells
}
