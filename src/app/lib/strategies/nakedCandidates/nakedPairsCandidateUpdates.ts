import { removeCandidatesFromCell } from "../../removeCandidatesFromCell"
import { EnhancedBoard } from "../../types"
import { getCellsByCandidate } from "./getCellsByCandidate"

interface Props {
  board: EnhancedBoard
  cellIndices: number[]
  numOfCandidates: number
}

export const nakedPairsCandidateUpdates = ({ board, cellIndices, numOfCandidates = 2 }: Props): void => {
  const cellsByCandidate = getCellsByCandidate({ board, cellIndices, numOfCandidates })

  const filtered = cellsByCandidate.filter((it) => it.matchingCellsIndices.length === numOfCandidates)
  const len = filtered.length
  const matches = []

  for (let i = 0; i < len; i++) {
    const matchingCellIndices = filtered[i].matchingCellsIndices
    for (let j = i + 1; j < len; j++) {
      const matchingCellIndices2 = filtered[j].matchingCellsIndices
      if (matchingCellIndices.every((it) => matchingCellIndices2.includes(it))) {
        matches.push(filtered[i])
        matches.push(filtered[j])
      }
    }
  }

  const candidatesToRemoveFromOtherCells = matches.map((it) => it.candidate)

  const cellsArray = matches.map((it) => it.matchingCellsIndices)
  const flattenned = cellsArray.flat()
  const cellsWithXCandidates = Array.from(new Set(flattenned))

  const cellsToRemoveCandidatesFrom = cellIndices.filter((it) => !cellsWithXCandidates.includes(it))

  cellsToRemoveCandidatesFrom.forEach((it) => {
    const cell = board.cells[it]

    removeCandidatesFromCell({ cell, candidatesToRemove: candidatesToRemoveFromOtherCells })
  })
}
