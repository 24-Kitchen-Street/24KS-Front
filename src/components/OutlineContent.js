import styled from "styled-components"
import px2vw from "../utils/px2vw"


export const OutlineContent = styled.div`
/* margin: 70px auto; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 40%;
height: 100vh;
padding: 1.5rem;
text-align: center;
font-size: 18px;
border: 5px solid rgba(255,255,255, 0.4);
background-color: rgba(0, 0, 0, 0);
color: #00bfb6;
left: 0;
font-family: 'Libre Baskerville', serif;
@media (max-height: 600px) {
    font-size: 15px;
    overflow-y: scroll;
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