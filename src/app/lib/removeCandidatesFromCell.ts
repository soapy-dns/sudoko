import { EnhancedCell } from "./types"

interface Props {
  candidatesToRemove: number[]
  cell: EnhancedCell
}
export const removeCandidatesFromCell = function ({ cell, candidatesToRemove }: Props): void {
  const { candidates } = cell

  // Note candidates will always have 9 elements (for a 9x9 board) etc, its just that some
  // can be null
  const filteredCandidates = candidates.map((candidate) => {
    return candidate && !candidatesToRemove.includes(candidate) ? candidate : null
  })
  cell.candidates = filteredCandidates
}
