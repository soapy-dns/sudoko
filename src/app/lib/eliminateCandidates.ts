import { getUsedValues } from "./utils/getUsedValues"
import { removeCandidatesFromCell } from "./removeCandidatesFromCell"
import { EnhancedBoard, Houses } from "./types"

interface Props {
  board: EnhancedBoard
  houses: Houses
}

// This is really the single candidate strategy.
export const eliminateCandidates = ({ houses, board }: Props) => {
  const boardSize = board.size

  for (let cellIndex = 0; cellIndex < boardSize; cellIndex++) {
    const cell = board.cells[cellIndex]
    const { coord, boxIndex } = cell
    const { x, y } = coord

    const rowIndex = 5
    const colIndex = 5
    const { width } = board

    const logIndex = rowIndex * width + colIndex

    const candidatesToRemoveRow = getUsedValues({ indices: houses.rowIndices[y], board })
    const candidatesToRemoveCol = getUsedValues({ indices: houses.colIndices[x], board })

    const candidatesToRemoveBox = getUsedValues({ indices: houses.boxIndices[boxIndex], board })

    if (logIndex === cellIndex) {
      console.log(`--------eliminateCandidates for cell ${logIndex}-------`)
      console.log("--to remove row--", candidatesToRemoveRow)
      console.log("--to remove  col--", candidatesToRemoveCol)
      console.log("--to remove box--", candidatesToRemoveBox)
      console.log("---------------------------------------")
    }

    const indexGroupings = [houses.rowIndices[y], houses.colIndices[x], houses.boxIndices[boxIndex]]
    indexGroupings.forEach((indices) => {
      // const rowIndex = 5
      // const colIndex = 3
      // const { width } = board

      // const logIndex = rowIndex * width + colIndex

      const candidatesToRemove = getUsedValues({ indices, board })

      // if (logIndex === cellIndex) {
      //   console.log("--candidatesToRemove--", candidatesToRemove, index)
      // }
      removeCandidatesFromCell({ cell, candidatesToRemove })
    })
  }
}
