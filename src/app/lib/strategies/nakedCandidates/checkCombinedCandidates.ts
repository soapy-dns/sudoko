import { EnhancedBoard } from "../../types"
import { listCellsCandidates } from "../../utils/listCellsCandidates"
import { removeCandidatesFromCells } from "../../utils/removeCandidatesFromCells"

interface Props {
  board: EnhancedBoard
  indices: number[]
  startIndex: number
  numOfCandidates: number
}

interface StoredCell {
  cellIndex: number
  candidates: number[]
}

// This function is recursive
// TODO: return type
export const checkCombinedCandidates = ({ board, indices, startIndex, numOfCandidates }: Props): boolean | number[] => {
  //log("startIndex: "+startIndex);
  const { width } = board
  const storedCells: StoredCell[] = []
  const minIndexes = [-1]

  // for each cell starting from index
  for (let i = Math.max(startIndex, minIndexes[startIndex]); i < width - numOfCandidates + startIndex; i++) {
    // console.log("--i--", i)
    //never check this cell again, in this loop
    minIndexes[startIndex] = i + 1
    //or in a this loop deeper down in recursions
    minIndexes[startIndex + 1] = i + 1

    const cellIndex = indices[i]
    const cellCandidates = listCellsCandidates({ cellIndex, board })

    // this is not a pair, triple or whatever we are looking for based on numOfCandidates
    if (cellCandidates.length === 0 || cellCandidates.length > numOfCandidates) continue

    //try adding this cell and it's cellCandidates,
    //but first need to check that that doesn't make (unique) amount of
    //candidates in combineInfo > n

    //if this is the first item we add, we don't need this check (above one is enough)
    if (storedCells.length > 0) {
      // we have already saved pair/triple/quad candidates
      const tempCandidates = [...cellCandidates]

      // loop thru the saved candidates for the cells we have saved
      storedCells.forEach((storedCell) => {
        const { candidates: storedCandidates } = storedCell
        storedCandidates.forEach((storedCandidate) => {
          if (!tempCandidates.includes(storedCandidate)) tempCandidates.push(storedCandidate)
        })
      })

      // TODO: understand why we are doing this
      if (tempCandidates.length > numOfCandidates) {
        continue //combined candidates spread over > n cells, won't work
      }
    }

    storedCells.push({ cellIndex, candidates: cellCandidates })

    if (startIndex < numOfCandidates - 1) {
      //still need to go deeper into combo
      const r = checkCombinedCandidates({ board, indices, startIndex: startIndex + 1, numOfCandidates })
      //when we come back, check if that's because we found answer.
      //if so, return with it, otherwise, keep looking
      if (r !== false) return r
    }

    //check if we match our pattern
    //if we have managed to combine n-1 cells,
    //(we already know that combinedCandidates is > n)
    //then we found a match!
    if (storedCells.length === numOfCandidates) {
      //now we need to check whether this eliminates any candidates

      //now we need to check whether this eliminates any candidates

      const cellsWithCandidates = []
      let combinedCandidates: number[] = [] //not unique either..
      for (let x = 0; x < storedCells.length; x++) {
        cellsWithCandidates.push(storedCells[x].cellIndex)
        combinedCandidates = combinedCandidates.concat(storedCells[x].candidates)
      }

      //get all cells in house EXCEPT cellsWithCandidates
      const cellsEffected: number[] = []
      for (let cellIndex = 0; cellIndex < width; cellIndex++) {
        if (!cellsWithCandidates.includes(indices[cellIndex])) {
          cellsEffected.push(indices[cellIndex])
        }
      }

      //remove all candidates on house, except the on cells matched in pattern
      const cellsUpdated = removeCandidatesFromCells({
        board,
        cellIndexes: cellsEffected,
        candidates: combinedCandidates
      })

      //if it does remove candidates, we're succeded!
      if (cellsUpdated.length > 0) {
        // if (solveMode === SOLVE_MODE_STEP) highLightCandidatesOnCells(combinedCandidates, cellsWithCandidates)

        // onlyUpdatedCandidates = true

        //return cells we actually update, duplicates removed
        const set = new Set(cellsUpdated)
        return Array.from(set)
      }
    }
  }
  if (startIndex > 0) {
    //if we added a value to our combo check, but failed to find pattern, we now need drop that value and go back up in chain and continue to check..
    if (storedCells.length > startIndex - 1) {
      //log("nakedCans: need to pop last added values..");
      storedCells.pop()
    }
  }
  return false
}
