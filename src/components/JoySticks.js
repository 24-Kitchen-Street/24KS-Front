import { Joystick } from "react-joystick-component"
import styled from "styled-components"
import { useStore } from "../store"

const JoysticksContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  padding: 2rem;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 2;
  z-index: 9999999999999;
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
