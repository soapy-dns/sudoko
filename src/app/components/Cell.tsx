"use client"

import { EnhancedCell } from "../lib/types"
import { Candidates } from "./Candidates"
import { useContext } from "react"
import { BoardContext } from "../ui/context/BoardProvider"

interface Props {
  boardWidth: number
  cell: EnhancedCell
}

export const Cell: React.FC<Props> = ({ boardWidth, cell }) => {
  const { showCandidates, updateCell } = useContext(BoardContext)

  const boxSize = Math.sqrt(boardWidth)
  const modValue = boxSize - 1

  const candidates = cell.candidates
  const maxlength = boardWidth < 10 ? 1 : 2

  const borderTop = cell.coord.y % boxSize === 0 ? "border-t-2 " : ""
  const borderLeft = cell.coord.x % boxSize === 0 ? "border-l-2 " : ""
  const borderRight = cell.coord.x % boxSize === modValue ? "border-r-2 " : ""
  const borderBottom = cell.coord.y % boxSize === modValue ? "border-b-2 " : ""

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      // clear cell
      updateCell(cell.index)
    } else {
      updateCell(cell.index, parseInt(e.target.value))
    }
  }

  return (
    <div
      key={`cell${cell.index}`}
      className={`relative border border-primary h-12  ${borderRight} ${borderBottom} ${borderLeft} ${borderTop}  border-primary flex justify-center items-center `}
    >
      <input
        value={cell.val || ""}
        className="w-full h-full text-center bg-gray-50 z-10 opacity-60   focus:bg-red-100"
        onChange={handleOnChange}
        pattern="\d*"
        maxLength={maxlength}
      />
      {showCandidates && (
        <div className="absolute">
          <Candidates cellIndex={cell.index} boardWidth={boardWidth} candidates={candidates} />
        </div>
      )}
    </div>
  )

  //   return (
  //     <div className="border-2 border-x-2 border-red-500 h-svw-5 w-svw-5 flex justify-center min-h-4">
  //       <div className="border-2 border-green-500 bg-yellow-300 w-full h-full">
  //         1{/* {val} */}
  //         {/* //want to use type=number, but then have to prevent chrome scrolling and up down key behaviors.. */}
  //         {/* <input type="text" pattern="\\d*" id={`input-${id}`} className="" value={val} maxLength={maxlength} readOnly /> */}
  //         {/* <div id={`input-${id}-candidates`}>
  //         <Candidates cellIndex={cellIndex} boardWidth={boardWidth} candidates={candidates} />
  //       </div> */}
  //       </div>
  //     </div>
  //   )
}
