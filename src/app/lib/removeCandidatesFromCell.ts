import { EnhancedCell } from "./types"

interface Props {
  candidatesToRemove: number[]
  cell: EnhancedCell
}
export const removeCandidatesFromCell = function ({ cell, candidatesToRemove }: Props): void {
  const { candidates } = cell

  const filteredCandidates = candidates.map((candidate) => {
    return !candidatesToRemove.includes(candidate) ? candidate : null
  })
  cell.candidates = filteredCandidates
}
