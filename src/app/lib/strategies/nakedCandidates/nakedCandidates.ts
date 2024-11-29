import { EnhancedBoard, Houses } from "../../types"
import { getCellsWithMatchingCandidates } from "./getCellsWithMatchingCandidates"
import { removeCandidatesFromCell } from "../../removeCandidatesFromCell"

interface Props {
  numOfCandidates: number
  houses: Houses
  board: EnhancedBoard
}

// numOfCandidates is 2 for doubles 3 for triples
// TODO: returns pattern or false.  Why would we want to do this?
export const nakedCandidates = ({ numOfCandidates, houses, board }: Props) => {
  Object.values(houses).forEach((house) => {
    house.forEach((cellIndices) => {
      const cellWithMatchingCandidates = getCellsWithMatchingCandidates({ board, cellIndices, numOfCandidates })
      console.log("--cellWithMatchingCandidates--", cellWithMatchingCandidates)
      const candidatesToRemove = cellWithMatchingCandidates.map((cell) => {
        return cell.candidates
      })
      console.log("--candidatesToRemove--", candidatesToRemove)
      const cellsWithMatchingIndices = cellWithMatchingCandidates.map((it) => it.index)

      const flattenned = candidatesToRemove.flat()

      const dedupedCandidatesToRemove = Array.from(new Set(flattenned))

      cellIndices.forEach((it) => {
        const cell = board.cells[it]
        if (!cell.val && !cellsWithMatchingIndices.includes(cell.index)) {
          removeCandidatesFromCell({ cell, candidatesToRemove: dedupedCandidatesToRemove })
        }
      })
    })
  })
}
