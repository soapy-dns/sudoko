import { nakedCandidates } from "../nakedCandidates"
import { EnhancedBoard, Houses } from "../../../types"

describe("nakedCandidates", () => {
  it("should remove candidates from cells that are not part of the naked candidates set", () => {
    const board: EnhancedBoard = {
      cells: [
        { index: 0, val: null, candidates: [1, 2, 3] },
        { index: 1, val: null, candidates: [1, 2] },
        { index: 2, val: null, candidates: [1, 2] },
        { index: 3, val: null, candidates: [3, 4, 5] }
      ]
    }

    const houses: Houses = {
      rows: [[0, 1, 2, 3]],
      columns: [],
      boxes: []
    }

    nakedCandidates({ numOfCandidates: 2, houses, board })

    expect(board.cells[0].candidates).toEqual([3])
    expect(board.cells[1].candidates).toEqual([1, 2])
    expect(board.cells[2].candidates).toEqual([1, 2])
    expect(board.cells[3].candidates).toEqual([3, 4, 5])
  })

  it("should not remove candidates if no matching candidates are found", () => {
    const board: EnhancedBoard = {
      cells: [
        { index: 0, val: null, candidates: [1, 2, 3] },
        { index: 1, val: null, candidates: [4, 5] },
        { index: 2, val: null, candidates: [6, 7] },
        { index: 3, val: null, candidates: [8, 9] }
      ]
    }

    const houses: Houses = {
      rows: [[0, 1, 2, 3]],
      columns: [],
      boxes: []
    }

    nakedCandidates({ numOfCandidates: 2, houses, board })

    expect(board.cells[0].candidates).toEqual([1, 2, 3])
    expect(board.cells[1].candidates).toEqual([4, 5])
    expect(board.cells[2].candidates).toEqual([6, 7])
    expect(board.cells[3].candidates).toEqual([8, 9])
  })

  it("should handle empty houses gracefully", () => {
    const board: EnhancedBoard = {
      cells: [
        { index: 0, val: null, candidates: [1, 2, 3] },
        { index: 1, val: null, candidates: [1, 2] },
        { index: 2, val: null, candidates: [1, 2] },
        { index: 3, val: null, candidates: [3, 4, 5] }
      ]
    }

    const houses: Houses = {
      rows: [],
      columns: [],
      boxes: []
    }

    nakedCandidates({ numOfCandidates: 2, houses, board })

    expect(board.cells[0].candidates).toEqual([1, 2, 3])
    expect(board.cells[1].candidates).toEqual([1, 2])
    expect(board.cells[2].candidates).toEqual([1, 2])
    expect(board.cells[3].candidates).toEqual([3, 4, 5])
  })

  it("should remove candidates from cells that are not part of the naked candidates set for triplets", () => {
    const board: EnhancedBoard = {
      cells: [
        { index: 0, val: null, candidates: [1, 2, 3, 4] },
        { index: 1, val: null, candidates: [1, 2, 3] },
        { index: 2, val: null, candidates: [1, 2, 3] },
        { index: 3, val: null, candidates: [1, 2, 3] },
        { index: 4, val: null, candidates: [3, 4, 5] }
      ]
    }

    const houses: Houses = {
      rows: [[0, 1, 2, 3, 4]],
      columns: [],
      boxes: []
    }

    nakedCandidates({ numOfCandidates: 3, houses, board })

    expect(board.cells[0].candidates).toEqual([4])
    expect(board.cells[1].candidates).toEqual([1, 2, 3])
    expect(board.cells[2].candidates).toEqual([1, 2, 3])
    expect(board.cells[3].candidates).toEqual([1, 2, 3])
    expect(board.cells[4].candidates).toEqual([4, 5])
  })

  it("testing actual case", () => {
    const board: EnhancedBoard = {
      cells: [
        { index: 0, val: null, candidates: [1, 2, 3, 4] },
        { index: 1, val: null, candidates: [1, 2, 3] },
        { index: 2, val: null, candidates: [1, 2, 3] },
        { index: 3, val: null, candidates: [1, 2, 3] },
        { index: 4, val: null, candidates: [3, 4, 5] }
      ]
    }

    const houses: Houses = {
      rows: [[0, 1, 2, 3, 4]],
      columns: [],
      boxes: []
    }

    nakedCandidates({ numOfCandidates: 3, houses, board })

    expect(board.cells[0].candidates).toEqual([4])
    expect(board.cells[1].candidates).toEqual([1, 2, 3])
    expect(board.cells[2].candidates).toEqual([1, 2, 3])
    expect(board.cells[3].candidates).toEqual([1, 2, 3])
    expect(board.cells[4].candidates).toEqual([4, 5])
  })
})
