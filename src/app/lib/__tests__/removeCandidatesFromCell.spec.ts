import { removeCandidatesFromCell } from "../removeCandidatesFromCell"
import { EnhancedCell } from "../types"

describe("removeCandidatesFromCell", () => {
  it("should remove specified candidates from the cell", () => {
    const cell: EnhancedCell = {
      candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
    const candidatesToRemove = [1, 3, 5]

    removeCandidatesFromCell({ cell, candidatesToRemove })

    expect(cell.candidates).toEqual([null, 2, null, 4, null, 6, 7, 8, 9])
  })

  it("should not modify candidates if none are to be removed", () => {
    const cell: EnhancedCell = {
      candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
    const candidatesToRemove: number[] = []

    removeCandidatesFromCell({ cell, candidatesToRemove })

    expect(cell.candidates).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it("should handle removing all candidates.", () => {
    const cell: EnhancedCell = {
      candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
    const candidatesToRemove = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    removeCandidatesFromCell({ cell, candidatesToRemove })

    expect(cell.candidates).toEqual([null, null, null, null, null, null, null, null, null])
  })

  it("should handle an empty cell", () => {
    const cell: EnhancedCell = {
      candidates: [null, null, null, null, null, null, null, null, null]
    }
    const candidatesToRemove = [1, 2, 3]

    removeCandidatesFromCell({ cell, candidatesToRemove })

    expect(cell.candidates).toEqual([null, null, null, null, null, null, null, null, null])
  })
})
