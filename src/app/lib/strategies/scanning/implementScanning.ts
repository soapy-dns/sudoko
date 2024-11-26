import { EnhancedBoard, Houses } from "../../types"
import { getUniqueCandidatesForHouse } from "./getUniqueCandidatesForHouse"

interface Props {
  board: EnhancedBoard
  houses: Houses
}

/*
This strategy checks to see if only 1 candidate exists because rows/ columns in other boxes preclude the candidate in other cells of a box
// Boxes only.  Should be rows and colums as well
*/
export const implementScanning = ({ houses, board }: Props) => {
  const emptyCells = board.filter((cell) => !cell.val)

  // for each cell with candidates (ie no value)
  emptyCells.forEach((cell) => {
    const { coord, boxIndex } = cell
    const { x, y } = coord

    const indexGroupings = [houses.rowIndices[y], houses.colIndices[x], houses.boxIndices[boxIndex]]
    indexGroupings.forEach((house) => {
      const uniqueCandidates = getUniqueCandidatesForHouse({ house, board, cell })

      if (uniqueCandidates.length > 0) {
        console.log("--update uniqueCandidates cell", cell.index)
        cell.candidates = uniqueCandidates
      }
    })
  })

  return board
}
