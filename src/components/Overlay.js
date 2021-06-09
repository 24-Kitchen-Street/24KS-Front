import styled from "styled-components"

export const Overlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  flex-direction: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  z-index: 9999999999;
`
