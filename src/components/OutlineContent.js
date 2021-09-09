import styled from "styled-components"
import px2vw from "../utils/px2vw"


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




// `
// export const OutlineContent = styled.div`
//   display: flex;
//   width: ${px2vw(320, 320)};
//   min-height: ${px2vw(100, 320)};
//   flex-direction: column;
//   padding: ${px2vw(10)};
//   margin: ${px2vw(20)};
//   background-color: ${props => props.bgColor};
//   height: 100%;
//   font-family: 'Libre Baskerville', serif;

//   @media (min-width: 768px) {
//     width: ${px2vw(320, 768)};
//     min-height: ${px2vw(100, 768)};
//     height: 100%;
//   }

//   @media (min-width: 1024px) {
//     width: ${px2vw(500)};
//     min-height: ${px2vw(100)};
//     height: 100%;
//   }
// `;