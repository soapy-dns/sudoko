import { removeAllListeners } from "process"
import { EnhancedBoard, EnhancedCell, Houses } from "../../types"
import { getMatchingCells } from "../../utils/getMatchingCells"
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
      const candidatesToRemove = cellWithMatchingCandidates.map((cell) => {
        return cell.candidates
      })
      const cellsWithMatchingIndices = cellWithMatchingCandidates.map((it) => it.index)

      const flattenned = candidatesToRemove.flat()

      const dedupedCandidatesToRemove = Array.from(new Set(flattenned))

      cellIndices.forEach((it) => {
        const cell = board.cells[it]
        if (!cell.val && !cellsWithMatchingIndices.includes(cell.index)) {
          removeCandidatesFromCell({ cell, candidatesToRemove: dedupedCandidatesToRemove })
        }
      })
      //   const cellsForIndices = cellIndices.reduce((accum, it) => {
      //     const cell = board.cells[it]
      //     if (!cell.val && !cellsWithMatchingIndices.includes(cell.index)) {
      //         accum.push()
      //     }
      //     return accum
      //   } ,[] as EnhancedCell[]}

      //   removeCandidatesFromCell({cell, candidatesToRemove: dedupedCandidatesToRemove})
    })
  })
}
