import { initBoard } from "../setup/initBoard"
import { Board, EnhancedBoard } from "../types"

describe("initBoard", () => {
  it("should initialize an empty board correctly", () => {
    const board: Board = Array(81).fill(null)
    const enhancedBoard: EnhancedBoard = initBoard(board)

    expect(enhancedBoard).toHaveLength(81)
    enhancedBoard.forEach((cell) => {
      expect(cell.val).toBeNull()
      expect(cell.candidates).toEqual([null, null, null, null, null, null, null, null, null])
    })
  })

  it("should initialize a partially filled board correctly", () => {
    const board: Board = Array(81).fill(null)
    board[0] = 5
    board[10] = 3
    const enhancedBoard: EnhancedBoard = initBoard(board)

    expect(enhancedBoard).toHaveLength(81)
    expect(enhancedBoard[0].val).toBe(5)
    expect(enhancedBoard[0].candidates).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(enhancedBoard[10].val).toBe(3)
    expect(enhancedBoard[10].candidates).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    enhancedBoard.forEach((cell, index) => {
      if (index !== 0 && index !== 10) {
        expect(cell.val).toBeNull()
        expect(cell.candidates).toEqual([null, null, null, null, null, null, null, null, null])
      }
    })
  })

  it("should handle a fully filled board correctly", () => {
    const board: Board = Array.from({ length: 81 }, (_, i) => (i % 9) + 1)
    const enhancedBoard: EnhancedBoard = initBoard(board)

    expect(enhancedBoard).toHaveLength(81)
    enhancedBoard.forEach((cell, index) => {
      expect(cell.val).toBe((index % 9) + 1)
      expect(cell.candidates).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
  })

  it("should handle an invalid board size", () => {
    const board: Board = Array(10).fill(null)
    const enhancedBoard: EnhancedBoard = initBoard(board)

    expect(enhancedBoard).toHaveLength(10)
    enhancedBoard.forEach((cell) => {
      expect(cell.val).toBeNull()
      expect(cell.candidates).toEqual([null, null, null, null, null, null, null, null, null])
    })
  })
})
