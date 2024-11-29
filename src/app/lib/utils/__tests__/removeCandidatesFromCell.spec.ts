import { removeCandidatesFromCell } from "../../removeCandidatesFromCell"
import { EnhancedCell } from "../../types"

describe("removeCandidatesFromCell", () => {
  it("should remove specified candidates from the cell", () => {
    const cell: EnhancedCell = { candidates: [1, 2, 3, 4, 5] }
    const candidatesToRemove = [2, 4]

    removeCandidatesFromCell({ cell, candidatesToRemove })

    expect(cell.candidates).toEqual([1, 3, 5])
  })

  it("should not modify candidates if none are to be removed", () => {
    const cell: EnhancedCell = { candidates: [1, 2, 3, 4, 5] }
    const candidatesToRemove: number[] = []

    removeCandidatesFromCell({ cell, candidatesToRemove })

    expect(cell.candidates).toEqual([1, 2, 3, 4, 5])
  })

  it("should remove all candidates if all are to be removed", () => {
    const cell: EnhancedCell = { candidates: [1, 2, 3, 4, 5] }
    const candidatesToRemove = [1, 2, 3, 4, 5]

    removeCandidatesFromCell({ cell, candidatesToRemove })

    expect(cell.candidates).toEqual([])
  })

  it("should handle removing candidates from an empty cell", () => {
    const cell: EnhancedCell = { candidates: [] }
    const candidatesToRemove = [1, 2, 3]

    removeCandidatesFromCell({ cell, candidatesToRemove })

    expect(cell.candidates).toEqual([])
  })

  it("should handle removing candidates that are not in the cell", () => {
    const cell: EnhancedCell = { candidates: [1, 2, 3] }
    const candidatesToRemove = [1, 4, 5, 6]

    removeCandidatesFromCell({ cell, candidatesToRemove })

    expect(cell.candidates).toEqual([2, 3])
  })
})
