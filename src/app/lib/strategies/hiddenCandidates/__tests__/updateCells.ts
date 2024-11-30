import { updateCells } from "../updateCells"
import { EnhancedBoard } from "../../../types"

describe("implement hidden candidates strategy", () => {
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
      { index: 5, val: null, candidates: [1, 3, 4, 7] }, // hidden pair
      { index: 6, val: null, candidates: [1, 3, 4, 5] }, // hidden pair
      { index: 7, val: 6, candidates: [] },
      { index: 8, val: null, candidates: [3, 5, 8] }
    ]
  }

  it("should return cells with hidden pairs", () => {
    updateCells({
      board: boardWithHiddenPair,
      cellIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      numOfCandidates: 2
    })

    expect(boardWithHiddenPair.cells[5].candidates).toEqual([1, 4])
    expect(boardWithHiddenPair.cells[6].candidates).toEqual([1, 4])
  })
})
