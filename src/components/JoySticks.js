import { useEffect, useState} from "react";
import { Joystick } from "react-joystick-component"
import { useStore } from "../store"
import styled from "styled-components"
import { sendChatMessage } from "../socket";

const JoysticksContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    bottom: 0;
    left:0; 
    opacity: 2.0;
    background: rgba(0, 0, 0, 0);
    z-index: 10000;


`

export function JoySticks () {
   // updating the store using useStore
const updateLeftJoy = useStore(state => state.updateLeftJoy)

// needs an if mobile function here
  function handleEvent (event) {
    //holder function for right joy & stop
      console.log(event)  
      console.log(updateLeftJoy)  
  }
    return (
      <JoysticksContainer>
        <Joystick size={100} baseColor="#00bfb6" stickColor="white" move={event => updateLeftJoy(event)} stop={event => updateLeftJoy(event)}></Joystick>
        <Joystick size={100} baseColor="transparent" stickColor="white" move={handleEvent} stop={handleEvent}></Joystick>        
      </JoysticksContainer>
    )
  }
  
