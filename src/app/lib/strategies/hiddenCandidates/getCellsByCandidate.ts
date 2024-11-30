import { EnhancedBoard } from "@/app/lib/types"

interface Props {
  board: EnhancedBoard
  cellIndices: number[]
}

interface OutputProps {
  candidate: number
  matchingCellsIndices: number[]
}
export const getCellsByCandidate = ({ board, cellIndices }: Props): OutputProps[] => {
  const allCandidates = board.allCandidates
  const relevantCells = cellIndices.map((it) => board.cells[it])
  console.log("--relevantCells--", relevantCells)

  const result = allCandidates.map((it) => {
    const matchingCells = relevantCells.filter((cell) => cell && cell.candidates.includes(it))
    const matchingCellsIndices = matchingCells.map((it) => it.index)
    return { candidate: it, matchingCellsIndices }
  })

  return result
}
