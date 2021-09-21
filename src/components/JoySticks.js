import { Joystick } from "react-joystick-component"
import styled from "styled-components"
import { useStore } from "../store"

const JoysticksContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 2;
  background: rgba(0, 0, 0, 1);
  z-index: 10000;
`

export function JoySticks() {
  const updateJoystick = useStore((state) => state.updateJoystick)

  return (
    <JoysticksContainer>
      <Joystick
        size={100}
        baseColor="#4f38e4"
        stickColor="white"
        move={(e) => updateJoystick("left", e.x, e.y)}
        stop={(e) => updateJoystick("left", 0, 0)}
      ></Joystick>
      <Joystick
        size={100}
        baseColor="#4f38e4"
        stickColor="white"
        move={(e) => updateJoystick("right", e.x, e.y)}
        stop={(e) => updateJoystick("right", 0, 0)}
      ></Joystick>
    </JoysticksContainer>
  )
}
