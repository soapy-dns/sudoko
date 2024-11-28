import { EnhancedBoard } from "../../types"
import { listCellsCandidates } from "../../utils/listCellsCandidates"

interface Props {
  numOfCandidates: number
  board: EnhancedBoard
  cellIndices: number[] // indices for a row / col / box
}

// TODO:
export const getCellsWithMatchingCandidates = ({ board, cellIndices, numOfCandidates }: Props): number[] => {
  const relevantCells = cellIndices.map((it) => {
    return board.cells[it]
  })

  const cellsWithXCandidates = relevantCells.filter((cell) => {
    return cell.candidates.length === numOfCandidates
  })

    for (let i = Math.max(startIndex, minIndexes[startIndex]); i < width - numOfCandidates + startIndex; i++) {

  //   a.every((val, index) => val === b[index])
}
