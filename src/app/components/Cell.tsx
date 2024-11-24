"use client"
import { callbackify } from "util"
import { EnhancedCell } from "../lib/types"
import { Candidates } from "./Candidates"

interface Props {
  boardWidth: number
  cell: EnhancedCell
  //   cellIndex: number // TODO: should this be in the boardCell?
}
export const Cell: React.FC<Props> = ({ boardWidth, cell }) => {
  //   const id = 1
  //   const boardCell = { val: 1, candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
  //   const boardWidth = 9
  const boxSize = Math.sqrt(boardWidth)
  const modValue = boxSize - 1

  //   const val = cell.val === null ? "" : cell.val
  const candidates = cell.candidates
  const maxlength = boardWidth < 10 ? 1 : 2

  const borderTop = cell.coord.y % boxSize === 0 ? "border-t-2 " : ""
  const borderLeft = cell.coord.x % boxSize === 0 ? "border-l-2 " : ""
  const borderRight = cell.coord.x % boxSize === modValue ? "border-r-2 " : ""
  const borderBottom = cell.coord.y % boxSize === modValue ? "border-b-2 " : ""

  return (
    <div
      key={`cell${cell.index}`}
      className={`border border-primary h-12 w-13 ${borderRight} ${borderBottom} ${borderLeft} ${borderTop}  border-primary flex justify-center items-center `}
    >
      {cell.val ? (
        <input
          value={cell.val}
          className="z-10 w-full text-center bg-gray-50"
          onChange={() => {}}
          pattern="\d*"
          maxLength={maxlength}
        />
      ) : (
        <Candidates cellIndex={cell.index} boardWidth={boardWidth} candidates={candidates} />
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
