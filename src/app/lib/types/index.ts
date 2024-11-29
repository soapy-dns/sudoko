type BoardCell = number | undefined

export type Board = BoardCell[]

export interface EnhancedCell {
  index: number
  val: BoardCell
  candidates: number[]
  coord: { x: number; y: number }
  boxIndex: number
}

export type EnhancedBoard = {
  size: number
  width: number
  cells: EnhancedCell[]
}

// TODO: Rename House to something which makes better sense
// TODO: better off not being a tuple
// rowIndices - row index, then index of cell in row
export type Houses = { rowIndices: number[][]; colIndices: number[][]; boxIndices: number[][] }
