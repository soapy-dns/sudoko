import { EnhancedCell } from "@/app/lib/types"
import { doCandidatesMatch } from "./doCandidatesMatch"

interface Props {
  cells: EnhancedCell[]
  startIndex: number
}
// return only the cells with matching candidates
// export const getMatchingCells = ({ cells, startIndex }: Props): number[] => {
//   const endIndex = cells.length - 1
//   // console.log("--startIndex, endIndex--------->", startIndex, endIndex)

//   let matchedCells: number[] = []
//   for (let i = startIndex + 1; i <= endIndex; i++) {
//     console.log("compare", startIndex, "against", i)
//     const cell = cells[startIndex]
//     const cellToCompare = cells[i]
//     if (candidatesMatch(cell, cellToCompare)) {
//       if (matchedCells.length === 0) {
//         // console.log("push, startIndex, index", startIndex, cells[startIndex].index)

//         matchedCells.push(cells[startIndex].index) // push the cell we are matching against
//       }
//       // console.log("--i, index--", i, cells[i].index)
//       matchedCells.push(cells[i].index)
//     }
//     // console.log("getMatchedCells for startIndex", startIndex + 1)
//     matchedCells = [...matchedCells].concat(getMatchingCells({ cells, startIndex: startIndex + 1 }))
//   }

//   //dedup
//   const set = new Set(matchedCells)
//   // console.log("--getMatchingCells startIndex=", startIndex, Array.from(set))

//   return Array.from(set)
// }

export const getMatchingCells = ({ cells }: Props): number[] => {
  const endIndex = cells.length - 1
  // console.log("--startIndex, endIndex--------->", startIndex, endIndex)

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
  }

  //dedup
  const set = new Set(matches)
  // console.log("--getMatchingCells startIndex=", startIndex, Array.from(set))

  return Array.from(set)
}
