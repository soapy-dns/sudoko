import { getMatchingCells } from "../getMatchingCells"
import { EnhancedCell } from "@/app/lib/types"

describe("getMatchingCells", () => {
  it("should return an empty array if no matching cells are found", () => {
    const cells: EnhancedCell[] = [
      { index: 0, candidates: [1, 2] },
      { index: 1, candidates: [3, 4] },
      { index: 2, candidates: [5, 6] }
    ]
    const result = getMatchingCells({ cells, startIndex: 0 })
    console.log("--result--", result)
    expect(result).toEqual([])
  })

  it("should return the indices of matching cells", () => {
    const cells: EnhancedCell[] = [
      { index: 0, candidates: [1, 2] },
      { index: 1, candidates: [1, 2] },
      { index: 2, candidates: [3, 4] },
      { index: 3, candidates: [1, 2] }
    ]
    const result = getMatchingCells({ cells, startIndex: 0 })
    expect(result).toEqual([0, 1, 3])
  })

  it("should handle the case where only one cell matches", () => {
    const cells: EnhancedCell[] = [
      { index: 0, candidates: [1, 2] },
      { index: 9, candidates: [3, 4] },
      { index: 18, candidates: [1, 2] }
    ]
    const result = getMatchingCells({ cells, startIndex: 0 })
    expect(result).toEqual([0, 18])
  })

  it("should handle the case where all cells match", () => {
    const cells: EnhancedCell[] = [
      { index: 0, candidates: [1, 2] },
      { index: 1, candidates: [1, 2] },
      { index: 2, candidates: [1, 2] }
    ]
    const result = getMatchingCells({ cells, startIndex: 0 })
    expect(result).toEqual([0, 1, 2])
  })

  it("should handle the case where all cells match", () => {
    const cells: EnhancedCell[] = [
      { index: 0, candidates: [1, 2] },
      { index: 9, candidates: [3, 4] },
      { index: 18, candidates: [1, 2] },
      { index: 27, candidates: [3, 4] }
    ]
    const result = getMatchingCells({ cells, startIndex: 0 })
    expect(result).toEqual([0, 18, 9, 27])
  })

  it("should handle an empty cells array", () => {
    const cells: EnhancedCell[] = []
    const result = getMatchingCells({ cells, startIndex: 0 })
    expect(result).toEqual([])
  })
})
