import { applyProps } from "@react-three/fiber"
import styled from "styled-components"

const Container = styled.div `
    position: absolute;
    z-index: 999999;
    /* display: flex; */
    /* flex-direction: column;
    align-items: center;
    justify-content: center; */
    padding: 2rem;
`

const Text = styled.p `
    padding: 2rem;
`

const CircularSb = styled.div`
    border: 5px solid #00bfb6;
    background-color: black;
    margin: 70px auto;
    border-radius: 70%;
    text-align: center;
    font-size: 20px;
    font-weight: 90;
    font-family: arial;
    color: #00bfb6;
    left: 0;
`

const Circle1 = styled.div`
    border: 5px solid #00bfb6;
    width: 25px;
    padding: 10px;
    border-radius: 50%;
    right: -15px;
    bottom: 23px;
`

// const Circle1.before = styled.div `
//   content: "";
//   position: absolute;
//   width: 25px;
//   padding: 20px;
//   border-radius: 50%;
//   right: 0px;
//   bottom: 0px;
//   background: #fff;
// `
const Circle2 = styled.div `
    border: 5px solid #00bfb6;
    width: 5px;
    padding: 10px 15px;
    border-radius: 50%;
    right: -10px;

`

export function SpeechBubble(props) {

    const handleClick = () => {

    }
  
    return (
        <Container>
            <CircularSb onClick={handleClick}>
            <Text>{props.text}</Text>
            </CircularSb>
                <Circle1 />
                <Circle2 />
            
        </Container>
    )
  }