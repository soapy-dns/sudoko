import { getUsedValues } from "./getUsedValues"
import { getAllCandidates } from "../setup/utils"
import { EnhancedBoard } from "../types"

interface Props {
  indices: number[] // a row, column, or box
  board: EnhancedBoard
}

// returns the values that are NOT used in the cells in the row / col / box
export const getUnusedValues = ({ indices, board }: Props): number[] => {
  const usedValues = getUsedValues({ indices, board })
  const allCandidates = getAllCandidates(board.width)

  const unusedValues = allCandidates.filter((it) => !usedValues.includes(it))

  return unusedValues
}
