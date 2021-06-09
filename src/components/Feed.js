import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  padding: 1rem;
  width: 15rem;
  flex-direction: column;
  bottom: 0;
  right: 0;
  max-height: 10rem;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1rem;
  z-index: 999999999;
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

export function Feed({ items }) {
  return (
    <Container>
      {items.map((item, i) => (
        <Item key={i} {...item} />
      ))}
    </Container>
  )
}
