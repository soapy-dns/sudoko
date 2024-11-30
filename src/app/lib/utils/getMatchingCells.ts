import { EnhancedCell } from "@/app/lib/types"
import { doCandidatesMatch } from "./doCandidatesMatch"

interface Props {
  cells: EnhancedCell[]
  // numOfCandidates: number

  // startIndex: number.
}
// for (let i = 0; i <= endIndex; i++) {
//     const cell = cells[i]
//     // const cellsToCompareAgainst = cells.splice(i)

//     return cells.filter((it) => doCandidatesMatch(cell, it))

export const getMatchingCells = ({ cells }: Props): number[] => {
  const endIndex = cells.length - 1

  const matches: number[] = []

  for (let i = 0; i <= endIndex; i++) {
    for (let j = i + 1; j <= endIndex; j++) {
      const cell = cells[i]
      const cellToCompare = cells[j]
      if (doCandidatesMatch(cell, cellToCompare)) {
        matches.push(cells[i].index) // push the cell we are matching against

        matches.push(cells[j].index)
      }
    }
    // if we have enough, we should stop looking - this stops the situation where we find 2
    // sets of triplets.  It does mean we'll need to iterate again, so maybe not the best
    //solution
    // if (matches.length >= numOfCandidates) continue
  }

  //dedup
  const set = new Set(matches)

  return Array.from(set)
}
