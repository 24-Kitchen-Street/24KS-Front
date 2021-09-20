import styled from "styled-components"



export const OutlineContent = styled.div`
/* margin: 70px auto; */
display: flex;
justify-content: center;
height: 100vh;
padding: 4.5rem;
text-align: center;
font-size: 18px;
border: 1px solid rgba(255,255,255, 0.3);
left: 0;
font-family: 'Libre Baskerville', serif;
@media (max-height: 600px) {
    font-size: 15px;
    overflow-y: scroll;
    height: 100vh;
  }
@media (max-width: 672px) {
    font-size: 15px;
    overflow-y: scroll;
    width: 50%;
  }
@media (max-height: 400px) {
    font-size: 15px;
    overflow-y: scroll;
    height: 100vh;
  }
`