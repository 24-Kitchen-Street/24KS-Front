import React from "react"
import { Arena } from "./Arena"
import { Avatars } from "./Avatars"
import { Lighting } from "./Lighting"
import { Discoball } from "./Discoball"
import { Logo } from "./Logo"

export function World() {
  return (
    <>
      <Lighting />
      <Avatars />
      <Discoball position={[0, 0, 0]} />

      <Arena />
      <Logo />
    </>
  )
}
