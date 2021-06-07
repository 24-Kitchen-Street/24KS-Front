import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { MeshNormalMaterial } from "three"

const mat = new MeshNormalMaterial()

export function Avatar(props) {
  const group = useRef()
  const { nodes } = useGLTF("/avatar.glb")
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tentaghost.geometry}
        material={mat}
      />
    </group>
  )
}

useGLTF.preload("/avatar.glb")
