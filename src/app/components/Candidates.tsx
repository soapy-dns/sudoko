import { getAllCandidates } from "../lib/setup/utils"

interface Props {
  boardWidth: number
  candidates: number[]
  cellIndex: number
}

// TODO: candidates type may change
export const Candidates: React.FC<Props> = ({ boardWidth, candidates, cellIndex }) => {
  const range: number[] = getAllCandidates(boardWidth)

  return (
    <div className="grid grid-cols-3 w-full " tabIndex={0}>
      {range.map((it, index) => {
        return candidates.includes(it) ? (
          <div key={`candidate${cellIndex}-${index}`} className="text-xs text-center size-3 bg-green-400">
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
