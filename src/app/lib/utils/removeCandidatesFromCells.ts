import { EnhancedBoard } from "../types"

interface Props {
  cellIndexes: number[]
  candidates: number[]
  board: EnhancedBoard
}

export const removeCandidatesFromCells = ({ board, cellIndexes, candidates }: Props): number[] => {
  //log("removeCandidatesFromCells");
  const cellsUpdated = []
  for (let i = 0; i < cellIndexes.length; i++) {
    const c = board.cells[cellIndexes[i]].candidates

    for (let j = 0; j < candidates.length; j++) {
      const candidate = candidates[j]
      //-1 because candidate '1' is at index 0 etc.
      if (c[candidate - 1] !== null) {
        c[candidate - 1] = null //NOTE: also deletes them from board variable
        cellsUpdated.push(cellIndexes[i]) //will push same cell multiple times

        // if (solveMode === SOLVE_MODE_STEP) {
        //   //highlight candidate as to be removed on board
        //   uIBoardHighlightRemoveCandidate(cells[i], candidate)
        // }
      }
    }
  }
  return cellsUpdated
}
