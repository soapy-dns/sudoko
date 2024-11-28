import { EnhancedBoard } from "../types"

interface Props {
  indices: number[] // either row, col or box indices
  board: EnhancedBoard
}

// returns the values that are already used in the cells in the row / col / box
export const getUsedValues = ({ indices, board }: Props): number[] => {
  console.log("--getUsedValues indices--", indices)
  const usedValues = indices.reduce((accum, it) => {
    const usedValue = board.cells[it].val

    if (usedValue && !accum.includes(usedValue)) accum.push(usedValue)
    return accum
  }, [] as number[])

  return usedValues
}
