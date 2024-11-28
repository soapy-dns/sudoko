import { listCellsCandidates } from "../listCellsCandidates"
import { EnhancedBoard } from "../../types"

describe("listCandidatesLeft", () => {
  it("should return a list of non-null candidates", () => {
    const board: EnhancedBoard = {
      cells: [
        { candidates: [1, 2, null, 4, null] },
        { candidates: [null, null, null, null, null] },
        { candidates: [5, 6, 7, 8, 9] }
      ]
    }
    const result = listCellsCandidates({ cellIndex: 0, board })
    expect(result).toEqual([1, 2, 4])
  })

  it("should return an empty list if all candidates are null", () => {
    const board: EnhancedBoard = {
      cells: [{ candidates: [null, null, null, null, null] }, { candidates: [1, 2, 3, 4, 5] }]
    }
    const result = listCellsCandidates({ cellIndex: 0, board })
    expect(result).toEqual([])
  })

  it("should return all candidates if none are null", () => {
    const board: EnhancedBoard = {
      cells: [{ candidates: [1, 2, 3, 4, 5] }, { candidates: [null, null, null, null, null] }]
    }
    const result = listCellsCandidates({ cellIndex: 0, board })
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it("should handle an empty candidates list", () => {
    const board: EnhancedBoard = {
      cells: [{ candidates: [] }, { candidates: [1, 2, 3, 4, 5] }]
    }
    const result = listCellsCandidates({ cellIndex: 0, board })
    expect(result).toEqual([])
  })
})
