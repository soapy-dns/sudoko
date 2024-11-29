import { EnhancedCell } from "@/app/lib/types"
import { doCandidatesMatch } from "./doCandidatesMatch"

interface Props {
  cells: EnhancedCell[]
  startIndex: number
}

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
  }

  //dedup
  const set = new Set(matches)

  return Array.from(set)
}
