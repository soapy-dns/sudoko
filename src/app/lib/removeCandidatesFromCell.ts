import { EnhancedCell } from "./types"

interface Props {
  candidatesToRemove: number[]
  cell: EnhancedCell
}
export const removeCandidatesFromCell = function ({ cell, candidatesToRemove }: Props): void {
  const { candidates } = cell

  // const newCandidates = [...candidates]

  // candidatesToRemove.forEach(it =>

  // )
  const filteredCandidates = candidates.filter((it) => {
    return !candidatesToRemove.includes(it)
  })
  // const filteredCandidates = candidates.map((candidate) => {
  //   return !candidatesToRemove.includes(candidate) ? candidate : null
  // })
  cell.candidates = filteredCandidates
}
