import { implementSingleCandidates } from "./singleCandidates/implementSingleCandidate"
import { EnhancedBoard, Houses } from "../types"
import { implementHiddenCandidates } from "./hiddenCandidates/implementHiddenCandidates"
// import { nakedCandidates } from "./nakedCandidates/nakedCandidates"
import { implementScanning } from "./scanning/implementScanning"
import { implementNakedCandidates } from "./nakedCandidates/implementHiddenCandidates"
import { updateSingleCandidates } from "../utils/updateSingleCandidates"

interface Props {
  board: EnhancedBoard
  houses: Houses
  solveRequested: boolean
}

// TODO: naked triplet, naked quad, hidden triplet, hidden quad not working
export const implementStrategies = ({ board, houses, solveRequested = false }: Props) => {
  if (board.filledCellCount === board.size) return

  const oldFilledCellsCount = board.filledCellCount
  implementSingleCandidates({ board, houses })
  implementScanning({ board, houses })
  implementNakedCandidates({ board, houses, numOfCandidates: 2 })
  implementHiddenCandidates({ board, houses })

  if (solveRequested) {
    updateSingleCandidates({ board })
    if (oldFilledCellsCount === board.filledCellCount) return
    implementStrategies({ board, houses, solveRequested })
  }
}
