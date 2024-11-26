import { EnhancedBoard, EnhancedCell } from "../../types"

interface Props {
  house: number[]
  cell: EnhancedCell
  board: EnhancedBoard
}

// TODO: return type
export const getUniqueCandidatesForHouse = ({ house: cellIndices, board, cell }: Props) => {
  let thisCandidatesSet = new Set(cell.candidates)

  // filter out the cell we are checking
  const filteredCellIndices = cellIndices.filter((index) => index !== cell.index)

  filteredCellIndices.forEach((index) => {
    const { candidates: otherCandidates } = board[index]
    const otherCandidatesSet = new Set(otherCandidates)
    const diff = thisCandidatesSet.difference(otherCandidatesSet)
    thisCandidatesSet = diff
  })

  const asArray = Array.from(thisCandidatesSet)

  // const arrayWithNull = asArray.filter((it) => it !== null)

  return asArray.filter((it) => it !== null)
}
