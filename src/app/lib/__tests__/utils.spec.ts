import { getBoxIndex } from "../utils"

describe("getBoxIndex", () => {
  it("should return the correct box index for a given cell in a 9x9 board", () => {
    const boxWidth = 3
    const result = getBoxIndex(4, 4, boxWidth)
    expect(result).toBe(4)
  })

  it("should return the correct box index for a given cell in a 16x16 board", () => {
    const boxWidth = 4
    const result = getBoxIndex(10, 10, boxWidth)
    expect(result).toBe(10)
  })

  it("should return the correct box index for a given cell in a 4x4 board", () => {
    const boxWidth = 2
    const result = getBoxIndex(2, 2, boxWidth)
    expect(result).toBe(3)
  })
})
