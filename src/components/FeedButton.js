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

export function FeedButton() {
  const showChat = useStore((state) => state.showChat)
  const setShowChat = useStore((state) => state.setShowChat)

  return (
    <>
      {showChat ? <button onClick={() => setShowChat(false)}>Close Chat</button>
    :
    <button onClick={() => setShowChat(true)}>Show Chat</button>
    }
    </>
  )
}
