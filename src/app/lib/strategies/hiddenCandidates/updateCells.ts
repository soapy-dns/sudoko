import { EnhancedBoard } from "../../types"
import { getCellsByCandidate } from "./getCellsByCandidate"

interface Props {
  board: EnhancedBoard
  cellIndices: number[]
  numOfCandidates: number
}

export const updateCells = ({ board, cellIndices, numOfCandidates = 2 }: Props): void => {
  const cellsByCandidate = getCellsByCandidate({ board, cellIndices })
  // console.log("--cellsByCandidate--", cellsByCandidate)

  // console.log("--cellIndices--", cellIndices)

  const filtered = cellsByCandidate.filter((it) => it.matchingCellsIndices.length === numOfCandidates)
  const len = filtered.length
  const matches = []

  // console.log("--filtered--", filtered)
  for (let i = 0; i < len; i++) {
    const matchingCellIndices = filtered[i].matchingCellsIndices
    for (let j = i + 1; j < len; j++) {
      const matchingCellIndices2 = filtered[j].matchingCellsIndices
      if (matchingCellIndices.every((it) => matchingCellIndices2.includes(it))) {
        matches.push(filtered[i])
        matches.push(filtered[j])
      }
    }
  }

  console.log("--hidden candidates matches--", matches)

  const candidatesToKeep = matches.map((it) => it.candidate)

  const cellsArray = matches.map((it) => it.matchingCellsIndices)
  const flattenned = cellsArray.flat()
  const cellIndicesToUpdate = Array.from(new Set(flattenned))

  // console.log("--cellIndicesToUpdate--", cellIndicesToUpdate)
  // console.log("--candidatesToKeep--", candidatesToKeep)

  // update the candidates to just the hidden pair
  cellIndicesToUpdate.forEach((it) => (board.cells[it].candidates = candidatesToKeep))

  //   const matchingCandidates = matches.map((it) => it.candidate)
  // const matchingCells = cell.matchingCellsIndices.map((it) => board.cells[it])
  // const matchingCandidates = matchingCells.map((it) => it.candidates).flat()
  // const uniqueCandidates = Array.from(new Set(matchingCandidates))

  // if (uniqueCandidates.length === numOfCandidates) {
  //   return filtered
  //   }

  //   console.log("--filteredCells--", filtered)
  // return filtered
}
