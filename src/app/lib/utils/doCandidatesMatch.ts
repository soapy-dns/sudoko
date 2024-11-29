import { EnhancedCell } from "../types"

// check if equivalent (don't need to check both ways as both cells have the same num of candidates)
export const doCandidatesMatch = (a: EnhancedCell, b: EnhancedCell) => {
  return a.candidates.every((it) => b.candidates.includes(it))
}
