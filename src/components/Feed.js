import styled from "styled-components"
import { useStore } from "../store"

const Container = styled.div`
  position: absolute;
  padding: 1rem;
  width: 15rem;
  flex-direction: column;
  bottom: 0;
  right: 0;

  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1rem;
  z-index: 999999999;

  h4 {
    margin: 0;
  }
`

const Inner = styled.div`
  max-height: 10rem;
  overflow: scroll;
`

const Row = styled.div`
  margin-bottom: 0.5rem;
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

  return (
    <Container>
      <h4>Num Players: {players.length}</h4>
      <Inner>
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </Inner>
    </Container>
  )
}
