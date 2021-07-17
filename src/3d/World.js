import React from "react"
import { Arena } from "./Arena"
import { Avatars } from "./Avatars"
import { Lighting } from "./Lighting"

export function World() {
  return (
    <>
      <Lighting />
      <Avatars />
      <Arena />

    </>
  )
}
