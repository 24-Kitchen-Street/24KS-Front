import styled from "styled-components"
import { useStore } from "../store"

const Container = styled.div`
  font-family: 'HkGrotesk Light';
  position: absolute;
  right: 5px;
  top: 4.5rem;
  user-select: none;

  button {
    font-family: 'HkGrotesk Light';
    font-size: 0.8rem;
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
