import styled from "styled-components"

const Container = styled.div`
  font-family: 'HkGrotesk Light';
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1rem;
  text-align: right;

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`

export function Tips() {
  return (
    <Container>
      <ul>
        <li>Move: WASD</li>
        <li>Look: Mouse</li>
        <li>Chat: Enter</li>
        <li>Quit: ESC</li>
      </ul>
    </Container>
  )
}
