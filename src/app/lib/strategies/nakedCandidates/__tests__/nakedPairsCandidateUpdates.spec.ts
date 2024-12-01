import { nakedPairsCandidateUpdates } from "../nakedPairsCandidateUpdates"
import { EnhancedBoard } from "../../../types"

describe("implement hidden candidates strategy", () => {
  const boardWithNakedPair: EnhancedBoard = {
    width: 9,
    size: 9,
    allCandidates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    cells: [
      { index: 0, val: null, candidates: [2, 3, 5, 6] },
      { index: 1, val: 2, candidates: [] },
      { index: 2, val: null, candidates: [1, 2, 5, 6] },
      { index: 3, val: null, candidates: [1, 2] }, // naked pair
      { index: 4, val: null, candidates: [1, 2] }, // naked pair
      { index: 5, val: null, candidates: [2, 4, 7] },
      { index: 6, val: null, candidates: [2, 4, 5] },
      { index: 7, val: 6, candidates: [] },
      { index: 8, val: null, candidates: [3, 5, 8] }
    ]
  }

  it("should return cells with naked pairs", () => {
    nakedPairsCandidateUpdates({
      board: boardWithNakedPair,
      cellIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      numOfCandidates: 2
    })

    expect(boardWithNakedPair.cells[0].candidates).toEqual([3, 5, 6])
    expect(boardWithNakedPair.cells[1].candidates).toEqual([])
    expect(boardWithNakedPair.cells[2].candidates).toEqual([5, 6])
    expect(boardWithNakedPair.cells[3].candidates).toEqual([1, 2])
    expect(boardWithNakedPair.cells[4].candidates).toEqual([1, 2])
    expect(boardWithNakedPair.cells[5].candidates).toEqual([4, 7])
    expect(boardWithNakedPair.cells[6].candidates).toEqual([4, 5])
    expect(boardWithNakedPair.cells[7].candidates).toEqual([])
    expect(boardWithNakedPair.cells[8].candidates).toEqual([3, 5, 8])

    // expect(boardWithHiddenPair.cells[6].candidates).toEqual([1, 4])
  })
})
