import styled from "styled-components"
import { useStore } from "../store"
import { isTouchDevice } from "../utils/isTouchDevice"

const Container = styled.div`
  position: absolute;
  padding: ${isTouchDevice() ? "0.7rem" : "1rem"};
  width: ${isTouchDevice() ? "9rem" : "15rem"};
  flex-direction: column;
  bottom: ${isTouchDevice() ? "default" : "0"};
  top: ${isTouchDevice() ? "0" : "default"};
  right: 0;

  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: ${isTouchDevice() ? "0.9rem" : "1rem"};
  z-index: 999999999;
  user-select: none;

  h4 {
    margin: 0;
  }
`

const Inner = styled.div`
  height: ${isTouchDevice() ? "3rem" : "10rem"};
  overflow: scroll;
`

const Row = styled.div`
  margin-bottom: 0.5em;
`

const Item = ({ title, message }) => (
  <Row>
    <strong>{title}</strong>
    {message && <>: {message}</>}
  </Row>
)

export function Feed() {
  const items = useStore((state) => state.feed)
  const players = useStore((state) => state.players)
  const showChat = useStore((state) => state.showChat)

  return (
    <>
      {showChat ?
            <Container>
            <h4>Num Players: {players.length}</h4>
              <Inner>
                {items.map((item, i) => (
                  <Item key={i} {...item} />
                ))}
              </Inner>      
            </Container>
      :
      <></>
      }
    </>
  )
}
