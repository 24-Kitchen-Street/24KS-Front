import styled from "styled-components"
import { useStore } from "../store"
import { FeedButton } from "./FeedButton"
import { ChatButton } from "./ChatButton"

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 5px;
  top: 4.5rem;
  user-select: none;

  button {
    font-size: 0.8rem;
  }
`

export function MobileButtons() {
  return (
    <Container>
      <FeedButton />
      <ChatButton />
    </Container>
  )
}
