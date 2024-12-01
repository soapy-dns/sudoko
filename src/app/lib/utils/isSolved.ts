// TODO: no longer required
import { EnhancedBoard } from "../types"

export const isSolved = (board: EnhancedBoard) => {
  const anyUnfilled = board.cells.some((cell) => !cell.val)
  return !anyUnfilled
  //   return board.cells.every((cell) => !!cell.val
}
