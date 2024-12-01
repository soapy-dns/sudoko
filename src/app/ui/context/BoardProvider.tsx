import { resetCandidates } from "@/app/lib/resetCandidates"
import { generateHouses } from "@/app/lib/setup/generateHouses"
import { initBoard } from "@/app/lib/setup/initBoard"
import { implementStrategies } from "@/app/lib/strategies"
import { EnhancedBoard } from "@/app/lib/types"
import React, { ReactNode, useState, createContext } from "react"

// prettier-ignore
// const board = [
// 			,5, , , ,2,3,8,
// 			, ,1, , , ,4, , ,5
// 			, ,2, , ,5, , , ,
// 			,5, ,7,8, , ,2,1,
// 			,4,6, ,2,3,7, ,5,8
// 			, ,9,8, , ,5,4, ,7
// 			, , , , ,6, , ,4,
// 			,1, , ,9, , , ,6,
// 			, ,7,3,4, , , ,9,undefined
// 		]
// prettier-ignore
const hiddenCandidateBoard = [
  4,,,3,1,9,,,6,
    ,,1,,,,9,,,
  ,6,7,4,,,,2,1,
  7,,,,5,,,,4,
  ,,,1,4,2,,,,
  2,,,,7,,,,8,
  ,2,,,,,,6,,
  ,,4,,,,8,,,
  1,,,5,,8,,,7,
     ]

// diabolic?
// prettier-ignore
const diabolicBoard = [
      ,7,,3,8,1,,9,,
      ,,,2,4,6,7,,,
      ,,,9,7,5,,,6,
      8,,,1,6,7,,3,,
      7,1,3,5,9,4,6,8,2,
      ,6,,8,2,3,1,7,9,
      1,,,7,5,2,,,,
      ,,7,4,3,9,,,,
      ,4,,6,1,8,,2,7]

// prettier-ignore
const defaultBoardX = [
          ,,3,,,,1,,,
          ,5,,,,,,6,,
          4,,,5,,3,,,9,
          ,,9,,3,,2,,,
          ,,,1,,6,,,,
          5,,8,4,2,9,3,,1,
          3,,,7,,4,,,5,
          ,4,,,,,,1,,
          ,,1,,,,9,,undefined
        ]

const defaultBoard = diabolicBoard
console.log("length--->", defaultBoard.length)

const houses = generateHouses(9)
const enhancedBoard = initBoard(defaultBoard)
implementStrategies({ board: enhancedBoard, houses, solveRequested: false })

interface Props {
  showCandidates: boolean
  toggleCandidatesView: () => void
  updateCell: (index: number, value?: number) => void
  board: EnhancedBoard
  solve: () => void
}

export const BoardContext = createContext<Props>({
  showCandidates: false,
  toggleCandidatesView: () => {},
  updateCell: () => {},
  solve: () => {},

  board: { size: 0, width: 0, cells: [], allCandidates: [], filledCellCount: 0 }
})

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [showCandidates, setShowCandidates] = useState<boolean>(false)
  const [board, setBoard] = useState<EnhancedBoard>(enhancedBoard)

  const toggleCandidatesView = () => {
    setShowCandidates(!showCandidates)
  }

  const updateCell = (index: number, value?: number) => {
    const newBoard = { ...board, cells: [...board.cells] }
    const oldCell = board.cells[index]
    const newCell = { ...oldCell, val: value, candidates: board.allCandidates }
    newBoard.cells[index] = newCell
    resetCandidates(newBoard)
    implementStrategies({ board: newBoard, houses, solveRequested: false })

    setBoard(newBoard)
  }

  const solve = () => {
    const newBoard = { ...board, cells: [...board.cells] }
    implementStrategies({ board: newBoard, houses, solveRequested: true })
    setBoard(newBoard)
  }

  return (
    <BoardContext.Provider value={{ toggleCandidatesView, showCandidates, updateCell, board, solve }}>
      {children}
    </BoardContext.Provider>
  )
}
