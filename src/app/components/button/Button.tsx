import { MouseEvent } from "react"

export enum ButtonType {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary"
}
interface IButton {
  buttonType: ButtonType
  disabled?: boolean
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}
export const Button: React.FC<IButton> = ({ buttonType, disabled = false, onClick, children }) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick(e)
  }

  const getButtonClassName = () => {
    switch (buttonType) {
      case ButtonType.primary:
        return "my-4 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-opacity-75 focus:ring-primary bg-primary py-2 px-4 shadow-md shadow-primary-darker/50 hover:shadow-primary-darker/25 text-white hover:bg-primary-darker disabled:opacity-40 display-block w-full flex justify-center items-center"

      case ButtonType.secondary:
        return "display-block w-full my-4 rounded-full border-2  border-primary  py-2 px-4 text-primary-foreground  disabled:opacity-40 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-opacity-75 focus:ring-primary flex flex-row justify-center items-center"

      case ButtonType.tertiary:
        return "py-2 text-primary-foreground  disabled:opacity-40 focus:outline focus:outline-2 focus:outline-primary"
    }
  }

  return (
    <button onClick={handleOnClick} disabled={disabled} className={getButtonClassName()}>
      {children}
    </button>
  )
}
