import { EnhancedBoard, Houses } from "../../types"
import { updateCells } from "./updateCells"

interface Props {
  board: EnhancedBoard
  houses: Houses
}
// TODO: only works for hidden twins at the moment.
export const implementHiddenCandidates = ({ board, houses }: Props) => {
  Object.values(houses).forEach((house) => {
    house.forEach((cellIndices) => {
      updateCells({ numOfCandidates: 2, board, cellIndices })
    })
  })
}
