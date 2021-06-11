import { Avatar } from "./Avatar"
import { Arena } from "./Arena"
import { useStore } from "../store"
import { useEffect, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
// import { WobblyMaterial } from "./WobblyMaterial"
import { Color } from "three"
import { Environment } from "@react-three/drei"
import { ShaderSphere } from "../3d/ShaderSphere"
import { InstancedAvatars } from "./InstancedAvatars"

const matA = {
  speed: 10,
  color: new Color(0x1bfc8f),
  roughness: 0,
  metalness: 1,
  opacity: 0.8,
  transparent: true,
  wireframe: false,
  time: 0,
  frequency: 0.5,
  amplitude: 0.5,
}

export function World() {
  return (
    <>
      <Environment preset="sunset" />
      <InstancedAvatars materialConfig={matA} />
      <ShaderSphere />
      <Arena />
    </>
  )
}
