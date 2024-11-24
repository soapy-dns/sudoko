// TODO:
//indexes of cells in each house - generated on the fly based on boardSize
const houses = [
  //rows
  [],
  //columns
  [],
  //boxes
  []
]

const boardSize = 9 // TODO: default

// prettier-ignore
const board = [
			,5, , , ,2,3,8,
			, ,1, , , ,4, , ,5
			, ,2, , ,5, , , ,
			,5, ,7,8, , ,2,1,
			,4,6, ,2,3,7, ,5,8
			, ,9,8, , ,5,4, ,7
			, , , , ,6, , ,4,
			,1, , ,9, , , ,6,
			, ,7,3,4, , , ,9,undefined
		]
//NOTE: if last cell of board is empty 'undefined' has to be used as value!

export const openSingles = () => {
  const hlength = houses.length
  for (let boxIndex = 0; boxIndex < hlength; boxIndex++) {
    //for each such house
    const housesCompleted = 0 //if goes up to 9, sudoku is finished

    for (const j = 0; j < boardSize; j++) {
      const emptyCells = []

      // for each cell..
      for (const k = 0; k < boardSize; k++) {
        const boardIndex = houses[boxIndex][j][k]
        if (board[boardIndex].val === null) {
          emptyCells.push({ house: houses[boxIndex][j], cell: boardIndex })
          if (emptyCells.length > 1) {
            //log("more than one empty cell, house area :["+i+"]["+j+"]");
            break
          }
        }
      }
      //one empty cell found
      if (emptyCells.length === 1) {
        const emptyCell = emptyCells[0]
        //grab number to fill in in cell
        const val = numbersLeft(emptyCell.house)
        if (val.length > 1) {
          //log("openSingles found more than one answer for: "+emptyCell.cell+" .. board incorrect!");
          boardError = true //to force solve all loop to stop
          return -1 //error
        }

        //log("fill in single empty cell " + emptyCell.cell+", val: "+val);

        setBoardCell(emptyCell.cell, val[0]) //does not update UI
        if (solveMode === SOLVE_MODE_STEP) uIBoardHighlightCandidate(emptyCell.cell, val[0])

        return [emptyCell.cell]
      }
      //no empty ells..
      if (emptyCells.length === 0) {
        housesCompleted++
        //log(i+" "+j+": "+housesCompleted);
        if (housesCompleted === boardSize) {
          boardFinished = true
          return -1 //special case, done
        }
      }
    }
  }
  return false
}
