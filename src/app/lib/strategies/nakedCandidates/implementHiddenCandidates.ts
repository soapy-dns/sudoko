import { EnhancedBoard, Houses } from "../../types"
import { nakedPairsCandidateUpdates } from "./nakedPairsCandidateUpdates"

interface Props {
  numOfCandidates: number
  houses: Houses
  board: EnhancedBoard
}
export const implementNakedCandidates = ({ board, houses }: Props) => {
  Object.values(houses).forEach((house) => {
    house.forEach((cellIndices) => {
      nakedPairsCandidateUpdates({ numOfCandidates: 2, board, cellIndices })
    })
  })
}
