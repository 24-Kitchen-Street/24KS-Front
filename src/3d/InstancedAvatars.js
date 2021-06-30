// Adapted from https://codesandbox.io/s/instanced-vertex-colors-8fo01

import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
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
  const [shouldPurge, setShouldPurge] = useState(false)

  useEffect(() => {
    setShouldPurge(true)
  }, [players.length])

  useFrame(({ clock }) => {
    // Only loop as much as we need
    const count = shouldPurge ? maxInstances : players.length

    for (let i = 0; i < count; i++) {
      player = players[i]
      if (player) {
        tempObject.position.set(...player.position)
        tempObject.rotation.set(...player.rotation)
        tempObject.updateMatrix()
        meshRef.current.setMatrixAt(i, tempObject.matrix)
      } else if (shouldPurge) {
        // If the number of players change, hide any loose instances
        meshRef.current.setMatrixAt(i, hiddenObject.matrix)
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    materialConfig.time = clock.getElapsedTime()
    setShouldPurge(false)
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
