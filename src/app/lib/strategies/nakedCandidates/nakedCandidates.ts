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
      if (cellWithMatchingCandidates.length < numOfCandidates) {
        return // if we only have 2 triplets then we shouldn't remove any - this is a bit hacky
      }
      //   if (cellIndices.includes(74)) {
      //     console.log("--cellWithMatchingCandidates--", cellWithMatchingCandidates)
      //   }
      const candidatesToRemove = cellWithMatchingCandidates.map((cell) => {
        return cell.candidates
      })
      //   if (cellIndices.includes(74)) {
      //     console.log("--candidatesToRemove--", candidatesToRemove)
      //   }
      const cellsWithMatchingIndices = cellWithMatchingCandidates.map((it) => it.index)
      //   console.log("--cellsWithMatchingIndices--", cellsWithMatchingIndices)

      const flattenned = candidatesToRemove.flat()
      //   if (cellIndices.includes(74)) {
      //     console.log("--flattenned--", flattenned)
      //   }

      const dedupedCandidatesToRemove = Array.from(new Set(flattenned))
      //   if (cellIndices.includes(74)) {
      //     console.log("--dedupedCandidatesToRemove--", dedupedCandidatesToRemove)
      //   }

      cellIndices.forEach((it) => {
        const cell = board.cells[it]
        if (!cell.val && !cellsWithMatchingIndices.includes(cell.index)) {
          //   console.log("remove ", dedupedCandidatesToRemove, "from", cell.candidates)
          removeCandidatesFromCell({ cell, candidatesToRemove: dedupedCandidatesToRemove })
          //   if (cell.candidates.length === 0) {
          //     console.log("--*** Neil *****cell, candidatesToRemove--", cell, dedupedCandidatesToRemove)
          //   }
        }
      })
    })
  })
}
