import { Button, ButtonType } from "./button/Button"
import { ButtonGroup } from "./button/ButtonGroup"

export const SolveButtons: React.FC = () => {
  const oneStep = () => {}
  const allSteps = () => {}

  return (
    <ButtonGroup>
      <Button buttonType={ButtonType.secondary} onClick={oneStep}>
        On Step
      </Button>
      <Button buttonType={ButtonType.secondary} onClick={allSteps}>
        All
      </Button>
    </ButtonGroup>
  )
}
