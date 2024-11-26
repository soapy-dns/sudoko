import { getUniqueCandidatesForHouse } from "../getUniqueCandidatesForHouse"
import { EnhancedBoard, EnhancedCell } from "../../../types"

describe("getUniqueCandidatesForHouse", () => {
  const board: EnhancedBoard = [
    { candidates: [1, 2], index: 0 },
    { candidates: [2, 3, 4], index: 1 },
    { candidates: [1, 2], index: 2 },
    { candidates: [1, null], index: 3 }
  ]
  it("should return unique candidates for the house", () => {
    const cell: EnhancedCell = board[0]
    const house = [0, 1]

    const result = getUniqueCandidatesForHouse({ house, board, cell })

    expect(result).toEqual([1])
  })

  it("should return an empty array if no unique candidates", () => {
    const cell: EnhancedCell = board[0]
    const house = [0, 2]

    const result = getUniqueCandidatesForHouse({ house, board, cell })

    expect(result).toEqual([])
  })

  it("should handle empty candidates in cell", () => {
    const cell: EnhancedCell = { candidates: [] }
    const house = [2, 3]

    const result = getUniqueCandidatesForHouse({ house, board, cell })

    expect(result).toEqual([])
  })

  it("should handle empty candidates in board", () => {
    const board: EnhancedBoard = [{ candidates: [] }, { candidates: [] }, { candidates: [] }, { candidates: [] }]
    const cell: EnhancedCell = { candidates: [1, 2, 3, 4, 5, 6] }
    const house = [0, 1, 2]

    const result = getUniqueCandidatesForHouse({ house, board, cell })

    expect(result).toEqual([1, 2, 3, 4, 5, 6])
  })

  it("should ignore candidates with nulls", () => {
    const board: EnhancedBoard = [{ candidates: [1, 2, 3] }, { candidates: [] }, { candidates: [] }, { candidates: [] }]
    const cell: EnhancedCell = { candidates: [1, 2, 3, 4, 5, null] }
    const house = [0, 1, 2]

    const result = getUniqueCandidatesForHouse({ house, board, cell })

    expect(result).toEqual([4, 5])
  })
})
