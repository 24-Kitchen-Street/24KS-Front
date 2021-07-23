// The floating UI above ghosts looks janky in club follow mode
// so doing a custom overlay to show player name and message

import styled from "styled-components"
import { useStore } from "../store"

const Container = styled.div`
  display: flex;
  position: absolute;
  padding: 2rem;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  color: white;

  h4 {
    font-size: 3rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    margin: 0;
  }

  span {
    display: block;
    font-size: 2rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem;
  }
`

export function FollowingUI() {
  const player = useStore(
    (state) => state.players[state.clubMode.followingIndex]
  )

  const myId = useStore((state) => state.me.id)

  return (
    <>
      {player && player.id !== myId && (
        <Container>
          <h4>{player.name}</h4>
          {player.lastMessage && <span>{player.lastMessage}</span>}
        </Container>
      )}
    </>
  )
}
