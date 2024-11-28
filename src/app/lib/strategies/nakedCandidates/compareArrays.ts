import {EnhancedCell} from "@/app/lib/types"

interface Props {
  cells: EnhancedCell[]
  startIndex: number
  matchedCells: EnhancedCell[]
}
// return only the cells with matching candidates
export const getMatchedCells = ({ cells, startIndex, matchedCells }: Props) => {
    const len = cells.length
  for (let i = startIndex; i < len; i++) {
    if (cells[startIndex].candidates.equals(cells[i].candidates))
  }
}
