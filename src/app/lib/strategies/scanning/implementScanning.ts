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
  console.log("--implementScanning--")
  const emptyCells = board.cells.filter((cell) => !cell.val)
  console.log("--emptyCells--", emptyCells)

  // for each cell with candidates (ie no value)
  emptyCells.forEach((cell) => {
    const { coord, boxIndex } = cell
    const { x, y } = coord

    const indexGroupings = [houses.rowIndices[y], houses.colIndices[x], houses.boxIndices[boxIndex]]
    indexGroupings.forEach((house) => {
      const uniqueCandidates = getUniqueCandidatesForHouse({ house, board, cell })
      if (x === 5 && y === 5) {
        console.log("uniqueCandidates", uniqueCandidates)
      }

      if (uniqueCandidates.length > 0) {
        console.log()
        cell.candidates = uniqueCandidates
      }
    })
  })

  return board
}
