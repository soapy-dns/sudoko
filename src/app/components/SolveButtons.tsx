import { useContext } from "react"
import { Button, ButtonType } from "./button/Button"
import { ButtonGroup } from "./button/ButtonGroup"
import { BoardContext } from "../ui/context/BoardProvider"

export const SolveButtons: React.FC = () => {
  const { toggleCandidatesView, showCandidates, solve } = useContext(BoardContext)
  const handleToggle = () => {
    toggleCandidatesView()
  }
  const handleSolve = () => {
    solve()
  }

  return (
    <ButtonGroup>
      <Button buttonType={ButtonType.secondary} onClick={handleToggle}>
        {showCandidates ? "Hide" : "Show"} Candidates
      </Button>
      <Button buttonType={ButtonType.secondary} onClick={handleSolve}>
        Solve
      </Button>
    </ButtonGroup>
  )
}
