import { eliminateCandidates } from "@/app/lib/eliminateCandidates"
import { resetCandidates } from "@/app/lib/resetCandidates"
import { generateHouses } from "@/app/lib/setup/generateHouses"
import { initBoard } from "@/app/lib/setup/initBoard"
import { getAllCandidates } from "@/app/lib/setup/utils"
import { EnhancedBoard } from "@/app/lib/types"
import React, { ReactNode, useState, createContext } from "react"

// prettier-ignore
const board = [
			,5, , , ,2,3,8,
			, ,1, , , ,4, , ,5
			, ,2, , ,5, , , ,
			,5, ,7,8, , ,2,1,
			,4,6, ,2,3,7, ,5,8
			, ,9,8, , ,5,4, ,7
			, , , , ,6, , ,4,
			,1, , ,9, , , ,6,
			, ,7,3,4, , , ,9,undefined
		]

const houses = generateHouses(9)
const enhancedBoard = initBoard(board)
eliminateCandidates({ board: enhancedBoard, houses })

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
  board: []
})

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [showCandidates, setShowCandidates] = useState<boolean>(false)
  const [board, setBoard] = useState<EnhancedBoard>(enhancedBoard)

  const toggleCandidatesView = () => {
    setShowCandidates(!showCandidates)
  }

  const updateCell = (index: number, value?: number) => {
    const boardWidth = Math.sqrt(board.length)
    const newBoard = [...board]
    const oldCell = board[index]
    const newCell = { ...oldCell, val: value, candidates: getAllCandidates(boardWidth) }
    newBoard[index] = newCell
    resetCandidates(newBoard)
    eliminateCandidates({ board: newBoard, houses }) // TODO: can we only do this for the affected row, column and box?

    setBoard(newBoard)
  }

  return (
    <BoardContext.Provider value={{ toggleCandidatesView, showCandidates, updateCell, board }}>
      {children}
    </BoardContext.Provider>
  )
}
