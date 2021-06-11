// Adapted from https://codesandbox.io/s/instanced-vertex-colors-8fo01

import * as THREE from "three"
import React, { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useStore } from "../store"
import { WobblyMaterial } from "./WobblyMaterial"

const tempObject = new THREE.Object3D()
let player

export function InstancedAvatars({ materialConfig }) {
  const meshRef = useRef()
  const { nodes } = useGLTF("/avatar.glb")
  const players = useStore((state) => state.players)
  const me = useStore((state) => state.me)

  useFrame(({ clock }) => {
    for (let i = 0; i < players.length; i++) {
      player = players[i]
      if (player.id === me.id) continue
      tempObject.position.set(...player.position)
      tempObject.rotation.set(...player.rotation)
      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true

    materialConfig.time = clock.getElapsedTime()
  })
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, 1000]}
      geometry={nodes.tentaghost.geometry}
    >
      <WobblyMaterial materialConfig={materialConfig} />
    </instancedMesh>
  )
}

useGLTF.preload("/avatar.glb")
