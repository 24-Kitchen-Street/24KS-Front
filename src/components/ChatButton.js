import styled from "styled-components"
import { useStore } from "../store"

const Container = styled.div`
  position: absolute;
  right: 5px;
  top: 8rem;

  button {
    font-size: 1rem;
  }
`

export function ChatButton() {
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)

  return (
    <Container>
      <button onClick={() => setCurrentPopup("chat")}>Send message</button>
    </Container>
  )
}
