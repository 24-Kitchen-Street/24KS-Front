// Adapted from https://codesandbox.io/s/instanced-vertex-colors-8fo01

import React, { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { WobblyMaterial } from "./WobblyMaterial"
import { InstancedBufferAttribute, Object3D } from "three"

const maxInstances = 1000
const tempObject = new Object3D()
let player

const memoArray = (m = 1) =>
  Float32Array.from(new Array(maxInstances * m).fill())

export function InstancedAvatars({ materialConfig, players }) {
  const meshRef = useRef()
  const { nodes } = useGLTF("/avatar.glb")

  const colorArray = useMemo(() => memoArray(3), [])
  const speedArray = useMemo(() => memoArray(), [])
  const ampArray = useMemo(() => memoArray(), [])
  const freqArray = useMemo(() => memoArray(), [])

  useEffect(() => {
    const attributes = [
      ["color", colorArray, 3],
      ["speed", speedArray, 1],
      ["frequency", freqArray, 1],
      ["amplitude", ampArray, 1],
    ]

    attributes.forEach((item) => {
      nodes.tentaghost.geometry.setAttribute(
        item[0],
        new InstancedBufferAttribute(item[1], item[2])
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame(({ clock }) => {
    for (let i = 0; i < players.length; i++) {
      player = players[i]
      if (player) {
        tempObject.position.set(...player.position)
        tempObject.rotation.set(...player.rotation)
        tempObject.updateMatrix()
        meshRef.current.setMatrixAt(i, tempObject.matrix)

        // Update color
        const [r, g, b] = player.color
        const offset = i * 3
        colorArray[offset] = b
        colorArray[offset + 1] = g
        colorArray[offset + 2] = r

        // Update wobble speed, amp, freq
        speedArray[i] = player.wobbleSpeed
        ampArray[i] = player.wobbleAmplitude
        freqArray[i] = player.wobbleFrequency
      }
    }

    meshRef.current.geometry.attributes.color.needsUpdate = true
    meshRef.current.geometry.attributes.speed.needsUpdate = true
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, maxInstances]}
      geometry={nodes.tentaghost.geometry}
      count={players.length}
    >
      <WobblyMaterial materialConfig={materialConfig} />
    </instancedMesh>
  )
}

useGLTF.preload("/avatar.glb")
