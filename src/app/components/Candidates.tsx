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
    <div className="grid grid-cols-3 w-full focus:outline">
      {range.map((it, index) => {
        return candidates.includes(it) ? (
          <div key={`candidate${cellIndex}-${index}`} className="text-xs text-center text-red-500 size-3">
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
