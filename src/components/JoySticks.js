import styled from "styled-components"
import { useStore } from "../store"
import "react-nipple/lib/styles.css"
import ReactNipple from "react-nipple"

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
  user-select: none;
`

// https://github.com/yoannmoinet/nipplejs/issues/54
// Having to calculate relative positions for joysticks
/// as library just gives angles and distance
const maxDist = 50
const toCart = ({ distance, angle: { radian } }) => ({
  x: (Math.cos(radian) * distance) / maxDist,
  y: (Math.sin(radian) * distance) / maxDist,
})

const commonProps = {
  options: {
    mode: "static",
    position: { top: "50%", left: "50%" },
  },
  style: {
    width: 150,
    height: 150,
  },
}

export function JoySticks() {
  const updateJoystick = useStore((state) => state.updateJoystick)

  return (
    <JoysticksContainer>
      <ReactNipple
        {...commonProps}
        onMove={(evt, data) => {
          const { x, y } = toCart(data)
          updateJoystick("left", x, y)
        }}
        onEnd={() => updateJoystick("left", 0, 0)}
      />
      <ReactNipple
        {...commonProps}
        onMove={(evt, data) => {
          const { x, y } = toCart(data)
          updateJoystick("right", x, y)
        }}
        onEnd={() => updateJoystick("right", 0, 0)}
      />
    </JoysticksContainer>
  )
}
