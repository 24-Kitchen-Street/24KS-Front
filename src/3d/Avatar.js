import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { MeshNormalMaterial, MeshBasicMaterial } from "three"
import { useFrame } from "@react-three/fiber"

const dummyMat = new MeshNormalMaterial()
const mat = new MeshBasicMaterial({ wireframe: true, color: 0xffffff })

export function Avatar(props) {
  const group = useRef()
  const { nodes } = useGLTF("/avatar.glb")

  useFrame(() => {
    group.current.position.set(...props.position)
    group.current.rotation.set(...props.rotation)
  })

  return (
    <mesh
      ref={group}
      geometry={nodes.tentaghost.geometry}
      material={props.isDummy ? dummyMat : mat}
    />
  )
}

useGLTF.preload("/avatar.glb")
