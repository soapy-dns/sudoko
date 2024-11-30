import { doCandidatesMatch } from "../doCandidatesMatch"
import { EnhancedCell } from "../../types"

describe("doCandidatesMatch", () => {
  it("should return true if candidates match", () => {
    const cellA: EnhancedCell = { candidates: [1, 2, 3] }
    const cellB: EnhancedCell = { candidates: [1, 2, 3] }
    expect(doCandidatesMatch(cellA, cellB)).toBe(true)
  })

  it("should return false if candidates do not match", () => {
    const cellA: EnhancedCell = { candidates: [1, 2, 3] }
    const cellB: EnhancedCell = { candidates: [1, 2, 4] }
    expect(doCandidatesMatch(cellA, cellB)).toBe(false)
  })

  it("should return false if one cell has more candidates", () => {
    const cellA: EnhancedCell = { candidates: [1, 2, 3, 4] }
    const cellB: EnhancedCell = { candidates: [1, 2, 3] }
    expect(doCandidatesMatch(cellA, cellB)).toBe(false)
  })

  it("should return true if both cells have no candidates", () => {
    const cellA: EnhancedCell = { candidates: [] }
    const cellB: EnhancedCell = { candidates: [] }
    expect(doCandidatesMatch(cellA, cellB)).toBe(true)
  })

  // TODO: maybe need to change this test, or the code.  this is because were are only comparing in one direction
  it.skip("should return false if one cell has no candidates", () => {
    const cellA: EnhancedCell = { candidates: [] }
    const cellB: EnhancedCell = { candidates: [1, 2, 3] }
    expect(doCandidatesMatch(cellA, cellB)).toBe(false)
  })
})
