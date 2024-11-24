import { EnhancedBoard } from "./types"

interface Props {
  indices: number[] // either row, col or box indices
  board: EnhancedBoard
}

// returns the values that are already used in the house
export const getCandidatesToRemove = ({ indices, board }: Props): number[] => {
  const usedValues = indices.reduce((accum, it) => {
    const usedValue = board[it].val

    if (usedValue && !accum.includes(usedValue)) accum.push(usedValue)
    return accum
  }, [] as number[])

  return usedValues
}
