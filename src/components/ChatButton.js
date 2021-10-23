import styled from "styled-components"
import { useStore } from "../store"

const Container = styled.div`
  position: absolute;
  right: 5px;
  top: 4.5rem;
  user-select: none;

  button {
    font-size: 0.8rem;
  }
`

export function ChatButton() {
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)
  const setShowChat = useStore((state) => state.setShowChat)
  const onClick = () => {
    setCurrentPopup("chat")
    setTimeout(() => setShowChat(true))
  }
  return (
    // <Container>
      <button onClick={onClick}>Send message</button>
    // </Container>
  )
}
