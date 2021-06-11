import { useStore } from "../store"
import { Overlay } from "./Overlay"

export function Intro() {
  const me = useStore((state) => state.me)
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)

  const handleClick = () => {
    setCurrentPopup(null)
  }

  return (
    <Overlay onClick={handleClick}>
      <p>Hey {me.name}!</p>
      <ul>
        <li>Use WASD and mouse to move and look around.</li>
        <li>Press ESC when you want to stop.</li>
        <li>Press ENTER to chat</li>
        <li>Click anywhere to begin!</li>
      </ul>
    </Overlay>
  )
}
