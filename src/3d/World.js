import React from "react"
import { Arena } from "./Arena"
import { Avatars } from "./Avatars"
import { Lighting } from "./Lighting"
import { IntroRoom } from "./IntroRoom"
import { ReflectiveShape } from "./ReflectiveShape"
import { ShaderSphere } from "./ShaderSphere"
// import { ShapeOne } from "./ShapeOne"

export function World() {
  return (
    <>
      <Lighting />
      <Avatars />
      <Arena />
      <ReflectiveShape />

    </>
  )
}
