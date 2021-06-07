import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { MeshNormalMaterial } from "three"

const mat = new MeshNormalMaterial()

export function Arena(props) {
  const group = useRef()
  const { nodes } = useGLTF("/arena.glb")
  return (
    <mesh
      ref={group}
      geometry={nodes.Cube.geometry}
      material={mat}
      scale={[325.27, 325.27, 325.27]}
    />
  )
}

useGLTF.preload("/arena.glb")
