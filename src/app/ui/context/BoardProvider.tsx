import { eliminateCandidates } from "@/app/lib/eliminateCandidates"
import { resetCandidates } from "@/app/lib/resetCandidates"
import { generateHouses } from "@/app/lib/setup/generateHouses"
import { initBoard } from "@/app/lib/setup/initBoard"
import { getAllCandidates } from "@/app/lib/setup/utils"
import { nakedCandidates } from "@/app/lib/strategies/nakedCandidates/nakedCandidates"
import { implementScanning } from "@/app/lib/strategies/scanning/implementScanning"
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

// diabolic?
// prettier-ignore
const defaultBoard = [
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
console.log("length--->", defaultBoard.length)

const houses = generateHouses(9)
const enhancedBoard = initBoard(defaultBoard)
eliminateCandidates({ board: enhancedBoard, houses })
// console.log("enhancedBoard", enhancedBoard)
const scannedDefaultBoard = implementScanning({ houses, board: enhancedBoard })

nakedCandidates({ numOfCandidates: 2, houses, board: scannedDefaultBoard })
nakedCandidates({ numOfCandidates: 3, houses, board: scannedDefaultBoard })

interface Props {
  showCandidates: boolean
  toggleCandidatesView: () => void
  updateCell: (index: number, value?: number) => void
  board: EnhancedBoard
}

export const BoardContext = createContext<Props>({
  showCandidates: false,
  toggleCandidatesView: () => {},
  updateCell: () => {},
  board: { size: 0, width: 0, cells: [] }
})

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [showCandidates, setShowCandidates] = useState<boolean>(false)
  const [board, setBoard] = useState<EnhancedBoard>(scannedDefaultBoard)

  const toggleCandidatesView = () => {
    setShowCandidates(!showCandidates)
  }

  const updateCell = (index: number, value?: number) => {
    const { width } = board
    const newBoard = { ...board, cells: [...board.cells] }
    const oldCell = board.cells[index]

    const newCell = { ...oldCell, val: value, candidates: getAllCandidates(width) }
    newBoard.cells[index] = newCell
    resetCandidates(newBoard)

    eliminateCandidates({ board: newBoard, houses }) // TODO: can we only do this for the affected row, column and box?
    const scannedBoard = implementScanning({ houses, board: newBoard })
    nakedCandidates({ numOfCandidates: 2, houses, board: scannedBoard })
    // nakedCandidates({ numOfCandidates: 3, houses, board: scannedBoard })

    setBoard(scannedBoard)
  }

  return (
    <BoardContext.Provider value={{ toggleCandidatesView, showCandidates, updateCell, board }}>
      {children}
    </BoardContext.Provider>
  )
}
