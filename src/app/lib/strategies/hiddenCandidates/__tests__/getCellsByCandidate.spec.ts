import { getCellsByCandidate } from "../getCellsByCandidate"
import { EnhancedBoard } from "@/app/lib/types"

const boardWithHiddenPair: EnhancedBoard = {
  width: 9,
  size: 9,
  allCandidates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  cells: [
    { index: 0, val: null, candidates: [3, 5, 8, 9] },
    { index: 1, val: 2, candidates: [] },
    { index: 2, val: null, candidates: [3, 5, 8, 9] },
    { index: 3, val: null, candidates: [7, 9] },
    { index: 4, val: null, candidates: [3, 9] },
    { index: 5, val: null, candidates: [1, 3, 4, 7] },
    { index: 6, val: null, candidates: [1, 3, 4, 5] },
    { index: 7, val: 6, candidates: [] },
    { index: 8, val: null, candidates: [3, 5, 8] }
  ]
}

describe("getCellsByCandidate", () => {
  it("should return correct cells for each candidate", () => {
    const board: EnhancedBoard = boardWithHiddenPair
    const cellIndices = [0, 2, 3, 4, 5, 6, 8]

    const result = getCellsByCandidate({ board, cellIndices })

    expect(result).toEqual([
      { candidate: 1, matchingCellsIndices: [5, 6] },
      { candidate: 2, matchingCellsIndices: [] },
      { candidate: 3, matchingCellsIndices: [0, 2, 4, 5, 6, 8] },
      { candidate: 4, matchingCellsIndices: [5, 6] },
      { candidate: 5, matchingCellsIndices: [0, 2, 6, 8] },
      { candidate: 6, matchingCellsIndices: [] },
      { candidate: 7, matchingCellsIndices: [3, 5] },
      { candidate: 8, matchingCellsIndices: [0, 2, 8] },
      { candidate: 9, matchingCellsIndices: [0, 2, 3, 4] }
    ])
  })

  //   it("should return empty array for candidates not present in any cell", () => {
  //     const board: EnhancedBoard = rowWithHiddenPair
  //     const cellIndices = [1, 7]

  //     const result = getCellsByCandidate({ board, cellIndices })

  //     expect(result).toEqual([
  //       { candidate: 1, matchingCellsIndices: [] },
  //       { candidate: 2, matchingCellsIndices: [] },
  //       { candidate: 3, matchingCellsIndices: [] },
  //       { candidate: 4, matchingCellsIndices: [] },
  //       { candidate: 5, matchingCellsIndices: [] },
  //       { candidate: 6, matchingCellsIndices: [] },
  //       { candidate: 7, matchingCellsIndices: [] },
  //       { candidate: 8, matchingCellsIndices: [] },
  //       { candidate: 9, matchingCellsIndices: [] }
  //     ])
  //   })

  //   it("should handle case with no candidates in any cell", () => {
  //     const board: EnhancedBoard = {
  //       ...rowWithHiddenPair,
  //       cells: rowWithHiddenPair.cells.map((cell) => ({ ...cell, candidates: [] }))
  //     }
  //     const cellIndices = [0, 2, 3, 4, 5, 6, 8]

  //     const result = getCellsByCandidate({ board, cellIndices })

  //     expect(result).toEqual([
  //       { candidate: 1, matchingCellsIndices: [] },
  //       { candidate: 2, matchingCellsIndices: [] },
  //       { candidate: 3, matchingCellsIndices: [] },
  //       { candidate: 4, matchingCellsIndices: [] },
  //       { candidate: 5, matchingCellsIndices: [] },
  //       { candidate: 6, matchingCellsIndices: [] },
  //       { candidate: 7, matchingCellsIndices: [] },
  //       { candidate: 8, matchingCellsIndices: [] },
  //       { candidate: 9, matchingCellsIndices: [] }
  //     ])
  //   })
})
