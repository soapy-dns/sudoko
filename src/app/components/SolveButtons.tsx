import { useContext } from "react"
import { Button, ButtonType } from "./button/Button"
import { ButtonGroup } from "./button/ButtonGroup"
import { BoardContext } from "../ui/context/BoardProvider"

export const SolveButtons: React.FC = () => {
  const { toggleCandidatesView, showCandidates } = useContext(BoardContext)
  const handleClick = () => {
    toggleCandidatesView()
  }
  // const oneStep = () => {}
  const allSteps = () => {}

  return (
    <ButtonGroup>
      <Button buttonType={ButtonType.secondary} onClick={handleClick}>
        {showCandidates ? "Hide" : "Show"} Candidates
      </Button>
      <Button buttonType={ButtonType.secondary} onClick={allSteps}>
        All
      </Button>
    </ButtonGroup>
  )
}
