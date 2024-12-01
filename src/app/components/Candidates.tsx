import { getAllCandidates } from "../lib/setup/utils"

interface Props {
  boardWidth: number
  candidates: number[]
  cellIndex: number
}

// TODO: candidates type may change
export const Candidates: React.FC<Props> = ({ boardWidth, candidates, cellIndex }) => {
  const range: number[] = getAllCandidates(boardWidth)
  // const {allCandidates: range} = board.a

  return (
    <div className="grid grid-cols-3 w-full ">
      {range.map((it, index) => {
        return candidates.includes(it) ? (
          <div
            key={`candidate${cellIndex}-${index}`}
            className="text-xs text-center size-3 text-green-700 font-semibold"
          >
            {it}
          </div>
        ) : (
          <div key={`candidate${cellIndex}-${index}`} className=" size-3">
            &nbsp;
          </div>
        )
      })}
    </div>
  )
}
