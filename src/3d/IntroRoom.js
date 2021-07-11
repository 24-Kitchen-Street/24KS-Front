import React from "react"
import { BackSide } from "three"
import { INTRO_POSITION } from "../config"

export function IntroRoom() {
  return (
    <mesh position={INTRO_POSITION}>
      <boxGeometry args={[30, 30, 30]} />
      <meshLambertMaterial side={BackSide} />
    </mesh>
  )
}
