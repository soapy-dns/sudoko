import { getUsedValues } from "../getUsedValues"
import { EnhancedBoard } from "../../types"

describe("getCandidatesToRemove", () => {
  it("should return an empty array when houseIndices is empty", () => {
    const board: EnhancedBoard = {
      cells: [
        { val: 1, candidates: [] },
        { val: 2, candidates: [] },
        { val: 3, candidates: [] },
        { val: 4, candidates: [] },
        { val: 5, candidates: [] },
        { val: 6, candidates: [] },
        { val: 7, candidates: [] },
        { val: 8, candidates: [] },
        { val: 9, candidates: [] }
      ]
    }
    const result = getUsedValues({ indices: [], board })
    expect(result).toEqual([])
  })

  it("should return used values from the houseIndices", () => {
    const board: EnhancedBoard = {
      cells: [
        { val: 1, candidates: [] },
        { val: 2, candidates: [] },
        { val: 3, candidates: [] },
        { val: 4, candidates: [] },
        { val: 5, candidates: [] },
        { val: 6, candidates: [] },
        { val: 7, candidates: [] },
        { val: 8, candidates: [] },
        { val: 9, candidates: [] }
      ]
    }
    const result = getUsedValues({ indices: [0, 1, 2], board })
    expect(result).toEqual([1, 2, 3])
  })

  it("should not include duplicate values", () => {
    const board: EnhancedBoard = {
      cells: [
        { val: 1, candidates: [] },
        { val: 2, candidates: [] },
        { val: 1, candidates: [] },
        { val: 4, candidates: [] },
        { val: 5, candidates: [] },
        { val: 6, candidates: [] },
        { val: 7, candidates: [] },
        { val: 8, candidates: [] },
        { val: 9, candidates: [] }
      ]
    }
    const result = getUsedValues({ indices: [0, 1, 2], board })
    expect(result).toEqual([1, 2])
  })

  it("should handle a board with empty cells", () => {
    const board: EnhancedBoard = {
      cells: [
        { val: 1, candidates: [] },
        { val: 0, candidates: [] },
        { val: 3, candidates: [] },
        { val: 0, candidates: [] },
        { val: 5, candidates: [] },
        { val: 0, candidates: [] },
        { val: 7, candidates: [] },
        { val: 0, candidates: [] },
        { val: 9, candidates: [] }
      ]
    }
    const result = getUsedValues({ indices: [0, 1, 2, 3, 4, 5, 6, 7, 8], board })
    expect(result).toEqual([1, 3, 5, 7, 9])
  })
})
