import { useContext } from "react"
import { Button, ButtonType } from "./button/Button"
import { ButtonGroup } from "./button/ButtonGroup"
import { AppContext } from "../ui/context/AppProvider"

export const SolveButtons: React.FC = () => {
  const { toggleCandidatesView, showCandidates } = useContext(AppContext)
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
