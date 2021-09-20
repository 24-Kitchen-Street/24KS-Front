import { Joystick } from "react-joystick-component"
import { useStore } from "../store"
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

export function JoySticks () {
   // updating the store using useStore
const updateLeftJoy = useStore(state => state.updateLeftJoy)

  function handleEvent (event) {
    //holder function for right joy & stop
      console.log(event)    
  }
    return (
      <JoysticksContainer>
        <Joystick size={100} baseColor="#4f38e4" stickColor="white" move={event => updateLeftJoy(event)} stop={handleEvent}></Joystick>
        <Joystick size={100} baseColor="#4f38e4" stickColor="white" move={handleEvent} stop={handleEvent}></Joystick>        
      </JoysticksContainer>
    )
  }
  