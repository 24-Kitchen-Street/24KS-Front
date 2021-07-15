import React from "react"
import { Arena } from "./Arena"
import { Avatars } from "./Avatars"
import { Lighting } from "./Lighting"
import { IntroRoom } from "./IntroRoom"
// import { ReflectiveShape } from "./ReflectiveShape"
// import { ShapeOne } from "./ShapeOne"

export function World() {
  return (
    <>
      <Lighting />
      <IntroRoom />
      <Avatars />
      <Arena />

    </>
  )
}
