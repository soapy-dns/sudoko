type NumberOrNull = number | null
interface Props {
  boardWidth: number
  candidates: NumberOrNull[]
  cellIndex: number
}

// TODO: candidates type may change
export const Candidates: React.FC<Props> = ({ boardWidth, candidates, cellIndex }) => {
  const range: number[] = []
  for (let i = 0; i < boardWidth; i++) {
    range.push(i + 1)
  }

  return (
    <div className="grid grid-cols-3 w-full focus:outline-3   focus:bg-red-500" tabIndex={0}>
      {range.map((it, index) => {
        return candidates.includes(it) ? (
          <div key={`candidate${cellIndex}-${index}`} className="text-xs text-center size-3 ">
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
