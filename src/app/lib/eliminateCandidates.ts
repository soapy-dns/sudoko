import { getCandidatesToRemove } from "./getCandidatesToRemove"
import { removeCandidatesFromCell } from "./removeCandidatesFromCell"
import { EnhancedBoard, Houses } from "./types"

interface Props {
  board: EnhancedBoard
  //   boardWidth: number
  houses: Houses
}
export const eliminateCandidates = ({ houses, board }: Props) => {
  const boardSize = board.length

  for (let callIndex = 0; callIndex < boardSize; callIndex++) {
    const cell = board[callIndex]
    const { coord, boxIndex } = cell
    const { x, y } = coord

    const indexGroupings = [houses.rowIndices[y], houses.colIndices[x], houses.boxIndices[boxIndex]]
    indexGroupings.forEach((indices) => {
      const candidatesToRemove = getCandidatesToRemove({ indices, board })
      removeCandidatesFromCell({ cell, candidatesToRemove })
    })

}
