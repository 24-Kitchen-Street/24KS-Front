import { useStore } from "../store"
import { Overlay } from "./Overlay"

export function ErrorScreen() {
  const generalError = useStore((state) => state.generalError)
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)

  const handleClick = () => {
    setCurrentPopup(null)
  }

  return (
    <Overlay onClick={handleClick}>
      <h3>Whoops! Smething went wrong</h3>
      <p>{generalError}</p>
      <p>(Press ESC to close this)</p>
    </Overlay>
  )
}
