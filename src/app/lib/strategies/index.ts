import { eliminateCandidates } from "../eliminateCandidates"
import { EnhancedBoard } from "../types"
import { implementHiddenCandidates } from "./hiddenCandidates/implementHiddenCandidates"
import { updateCells } from "./hiddenCandidates/updateCells"
import { nakedCandidates } from "./nakedCandidates/nakedCandidates"
import { implementScanning } from "./scanning/implementScanning"

interface Props {
  board: EnhancedBoard
  houses: Houses
}

export const implementStrategies = ({ board, houses }: Props) => {
  eliminateCandidates({ board, houses })
  // console.log("enhancedBoard", enhancedBoard)
  //   const scannedDefaultBoard =
  implementScanning({ houses, board })

  nakedCandidates({ numOfCandidates: 2, houses, board })
  implementHiddenCandidates({ board, houses })
  // nakedCandidates({ numOfCandidates: 3, houses, board: scannedDefaultBoard })
}
