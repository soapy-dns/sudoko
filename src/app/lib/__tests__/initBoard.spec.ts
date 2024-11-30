import { initBoard } from "../setup/initBoard"
import { RawBoard, EnhancedBoard } from "../types"

describe("initBoard", () => {
  it("should initialize an empty board correctly", () => {
    const board: RawBoard = Array(81).fill(0)
    const enhancedBoard: EnhancedBoard = initBoard(board)

    expect(enhancedBoard.size).toBe(81)
    expect(enhancedBoard.width).toBe(9)
    expect(enhancedBoard.cells.length).toBe(81)
    enhancedBoard.cells.forEach((cell) => {
      expect(cell.val).toBe(0)
      expect(cell.candidates.length).toBe(9)
    })
  })

  it("should initialize a partially filled board correctly", () => {
    const board: RawBoard = Array(81).fill(0)
    board[0] = 5
    board[10] = 3
    const enhancedBoard: EnhancedBoard = initBoard(board)

    expect(enhancedBoard.size).toBe(81)
    expect(enhancedBoard.width).toBe(9)
    expect(enhancedBoard.cells.length).toBe(81)
    expect(enhancedBoard.cells[0].val).toBe(5)
    expect(enhancedBoard.cells[0].candidates.length).toBe(0)
    expect(enhancedBoard.cells[10].val).toBe(3)
    expect(enhancedBoard.cells[10].candidates.length).toBe(0)
  })

  it("should calculate the correct box index for each cell", () => {
    const board: RawBoard = Array(81).fill(1)
    const enhancedBoard: EnhancedBoard = initBoard(board)

    expect(enhancedBoard.cells[0].boxIndex).toBe(0)
    expect(enhancedBoard.cells[10].boxIndex).toBe(0)
    expect(enhancedBoard.cells[40].boxIndex).toBe(4)
    expect(enhancedBoard.cells[80].boxIndex).toBe(8)
  })
})
