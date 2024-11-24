import { Houses } from "../types"

/* generateHouseIndexList
Assumes each cell has an index starting top left, going right, then down. For a 9 x 9 puzzle, the first cell is 0, the first cell on the 2nd row is 10.
Then 3 arrays of indexes, one representing rows, one columns and one boxes.

Assuming a 9 x 9 puzzle.
Rows:
The rows will have 9 arrays, each array representing a row.  The first row will be [0,1,2,3,4,5,6,7,8], the second row will be [9,10,11,12,13,14,15,16,17] etc.

Columns:
The columns will have 9 arrays, each array representing a column.  The first column will be [0,9,18,27,36,45,54,63,72], the second column will be [1,10,19,28,37,46,55,64,73] etc.

Boxes: 
The boxes will have 9 arrays, each array representing a box.  The first box will be [0,1,2,9,10,11,18,19,20], the second box will be [3,4,5,12,13,14,21,22,23] etc.
 * -----------------------------------------------------------------*/
export const generateHouses = function (boardWidth: number): Houses {
  const rowIndices: number[][] = []
  const colIndices: number[][] = []
  const boxIndices: number[][] = []

  const boxWidth = Math.sqrt(boardWidth)

  for (let i = 0; i < boardWidth; i++) {
    const row = []
    const col = []
    const box = []
    for (let j = 0; j < boardWidth; j++) {
      row.push(boardWidth * i + j)
      col.push(boardWidth * j + i)

      if (j < boxWidth) {
        for (let k = 0; k < boxWidth; k++) {
          //0, 0,0, 27, 27,27, 54, 54, 54 for a standard sudoku
          const a = Math.floor(i / boxWidth) * boardWidth * boxWidth
          //[0-2] for a standard sudoku
          const b = (i % boxWidth) * boxWidth
          const boxStartIndex = a + b //0 3 6 27 30 33 54 57 60

          box.push(boxStartIndex + boardWidth * j + k)
        }
      }
    }
    rowIndices.push(row)
    colIndices.push(col)
    boxIndices.push(box)
  }
  return { rowIndices, colIndices, boxIndices }
}
