import { EnhancedBoard } from "../../types"
import { listCandidatesLeft } from "../../utils/listCandidatesLeft"

interface Props {
  board: EnhancedBoard
  indices: number[]
  startIndex: number
  numOfCandidates: number
}

interface CombineInfo {
  cellIndex: number
  candidates: number[]
}

// This function is recursive
export const checkCombinedCandidates = ({ board, indices, startIndex, numOfCandidates }: Props) => {
  //log("startIndex: "+startIndex);
  const { size } = board
  const combineInfo: CombineInfo[] = []
  const minIndexes = [-1]

  for (let i = Math.max(startIndex, minIndexes[startIndex]); i < size - numOfCandidates + startIndex; i++) {
    //never check this cell again, in this loop
    minIndexes[startIndex] = i + 1
    //or in a this loop deeper down in recursions
    minIndexes[startIndex + 1] = i + 1

    const cellIndex = indices[i]
    const cellCandidates = listCandidatesLeft({ cellIndex, board })

    if (cellCandidates.length === 0 || cellCandidates.length > numOfCandidates) continue

    //try adding this cell and it's cellCandidates,
    //but first need to check that that doesn't make (unique) amount of
    //candidates in combineInfo > n

    //if this is the first item we add, we don't need this check (above one is enough)
    if (combineInfo.length > 0) {
      const temp = [...cellCandidates]
      for (let a = 0; a < combineInfo.length; a++) {
        const candidates = combineInfo[a].candidates
        for (let b = 0; b < candidates.length; b++) {
          if (!contains(temp, candidates[b])) temp.push(candidates[b])
        }
      }
      if (temp.length > numOfCandidates) {
        continue //combined candidates spread over > n cells, won't work
      }
    }

    combineInfo.push({ cellIndex, candidates: cellCandidates })

    if (startIndex < numOfCandidates - 1) {
      //still need to go deeper into combo
      const r = checkCombinedCandidates(indices, startIndex + 1)
      //when we come back, check if that's because we found answer.
      //if so, return with it, otherwise, keep looking
      if (r !== false) return r
    }

    //check if we match our pattern
    //if we have managed to combine n-1 cells,
    //(we already know that combinedCandidates is > n)
    //then we found a match!
    if (combineInfo.length === numOfCandidates) {
      //now we need to check whether this eliminates any candidates

      //now we need to check whether this eliminates any candidates

      const cellsWithCandidates = []
      let combinedCandidates: number[] = [] //not unique either..
      for (let x = 0; x < combineInfo.length; x++) {
        cellsWithCandidates.push(combineInfo[x].cellIndex)
        combinedCandidates = combinedCandidates.concat(combineInfo[x].candidates)
      }

      //get all cells in house EXCEPT cellsWithCandidates
      const cellsEffected = []
      for (let y = 0; y < size; y++) {
        if (!contains(cellsWithCandidates, indices[y])) {
          cellsEffected.push(indices[y])
        }
      }

      //remove all candidates on house, except the on cells matched in pattern
      const cellsUpdated = removeCandidatesFromCells(cellsEffected, combinedCandidates)

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
    if (combineInfo.length > startIndex - 1) {
      //log("nakedCans: need to pop last added values..");
      combineInfo.pop()
    }
  }
  return false
}
