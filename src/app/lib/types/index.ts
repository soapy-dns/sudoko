type RawCell = number | undefined

export type RawBoard = RawCell[]

export interface EnhancedCell {
  index: number
  val: RawCell
  candidates: number[]
  coord: { x: number; y: number }
  boxIndex: number
}

export type EnhancedBoard = {
  filledCellCount: number
  size: number
  width: number
  cells: EnhancedCell[]
  allCandidates: number[]
}

// TODO: Rename House to something which makes better sense
// TODO: better off not being a tuple
// rowIndices - row index, then index of cell in row
export type Houses = { rowIndices: number[][]; colIndices: number[][]; boxIndices: number[][] }
