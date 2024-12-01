import { getUsedValues } from "../../utils/getUsedValues"
import { removeCandidatesFromCell } from "../../removeCandidatesFromCell"
import { EnhancedBoard, Houses } from "../../types"

interface Props {
  board: EnhancedBoard
  houses: Houses
}

// This is really the single candidate strategy.
export const implementSingleCandidates = ({ houses, board }: Props) => {
  const boardSize = board.size

  for (let cellIndex = 0; cellIndex < boardSize; cellIndex++) {
    const cell = board.cells[cellIndex]
    const { coord, boxIndex } = cell
    const { x, y } = coord

    const indexGroupings = [houses.rowIndices[y], houses.colIndices[x], houses.boxIndices[boxIndex]]
    indexGroupings.forEach((indices) => {
      const candidatesToRemove = getUsedValues({ indices, board })

      removeCandidatesFromCell({ cell, candidatesToRemove })
    })
  }
}
