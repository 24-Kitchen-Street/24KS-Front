// Adapted from https://codesandbox.io/s/instanced-vertex-colors-8fo01

import * as THREE from "three"
import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { WobblyMaterial } from "./WobblyMaterial"

const maxInstances = 500

const tempObject = new THREE.Object3D()

// For all instances that dont have players assigned, put them far away
// TODO: Maybe there's a less hacky way to do this??
const hiddenObject = new THREE.Object3D()
hiddenObject.position.set(9999, 9999, 9999)
hiddenObject.updateMatrix()

let player

export function InstancedAvatars({ materialConfig, players }) {
  const meshRef = useRef()
  const { nodes } = useGLTF("/avatar.glb")

  useFrame(({ clock }) => {
    for (let i = 0; i < maxInstances; i++) {
      player = players[i]
      if (player) {
        tempObject.position.set(...player.position)
        tempObject.rotation.set(...player.rotation)
        tempObject.updateMatrix()
        meshRef.current.setMatrixAt(i, tempObject.matrix)
      } else {
        meshRef.current.setMatrixAt(i, hiddenObject.matrix)
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true

    materialConfig.time = clock.getElapsedTime()
  })
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, maxInstances]}
      geometry={nodes.tentaghost.geometry}
    >
      <WobblyMaterial materialConfig={materialConfig} />
    </instancedMesh>
  )
}

useGLTF.preload("/avatar.glb")
