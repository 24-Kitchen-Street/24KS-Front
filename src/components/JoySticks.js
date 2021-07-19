import { Joystick } from "react-joystick-component"
import styled from "styled-components"

const JoysticksContainer = styled.div`
    display: flex;
    position: absolute;
    bottom:0;
    left:0;
    opacity: 2.0;
    background: rgba(0, 0, 0, 1);
    z-index: 10000;


`

const handleMove = () => {
    
}
const handleStop = () => {

}

export function JoySticks () {
    return (
      <JoysticksContainer>
        <Joystick size={100} baseColor="purple" stickColor="white" move={handleMove} stop={handleStop}></Joystick>
        <Joystick size={100} baseColor="yellow" stickColor="white" move={handleMove} stop={handleStop}></Joystick>        
      </JoysticksContainer>
    )
  }
  