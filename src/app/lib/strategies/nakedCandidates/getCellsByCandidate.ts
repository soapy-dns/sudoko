import { EnhancedBoard } from "@/app/lib/types"

interface Props {
  board: EnhancedBoard
  cellIndices: number[]
  numOfCandidates: number
}

interface OutputProps {
  candidate: number
  matchingCellsIndices: number[]
}

// filtering relevant cells by num of candidates improves efficiency for naked candidates
// but breaks hidden candidates
export const getCellsByCandidate = ({ board, cellIndices, numOfCandidates }: Props): OutputProps[] => {
  const allCandidates = board.allCandidates
  const relevantCells = cellIndices.map((it) => board.cells[it])

  const filteredCells = relevantCells.filter((it) => it.candidates.length === numOfCandidates)
  const result = allCandidates.map((it) => {
    const matchingCells = filteredCells.filter((cell) => cell && cell.candidates.includes(it))
    const matchingCellsIndices = matchingCells.map((it) => it.index)
    return { candidate: it, matchingCellsIndices }
  })

  return result
}
