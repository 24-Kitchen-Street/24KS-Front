import React, { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { streamMaterial } from "../utils/streamMaterial"
import { AcidMaterial } from "./AcidMaterial"
import { useFrame } from "@react-three/fiber"

const acidMat = new AcidMaterial()

export function Arena(props) {
  const { nodes, scene } = useGLTF("/arena2.glb")

  useEffect(() => {
    const clubMat = nodes.structure.material
    const clubMatScale = 10
    clubMat.map.repeat.set(clubMatScale, clubMatScale)
    clubMat.roughnessMap.repeat.set(clubMatScale, clubMatScale)
    clubMat.roughness = 1
    clubMat.metalness = 0
    clubMat.normalMap.repeat.set(clubMatScale, clubMatScale)
    clubMat.metalnessMap.repeat.set(clubMatScale, clubMatScale)

    nodes.widescreen0.material = streamMaterial
    nodes.widescreen1.material = streamMaterial

    const numScreens = 19
    for (let i = 0; i < numScreens; i++) {
      nodes[`screen${i}`].material = acidMat
    }
  }, [nodes])

  useFrame(({ clock }) => {
    acidMat.time = clock.getElapsedTime()
  })

  return <primitive object={scene} scale={40} />
}

useGLTF.preload("/arena2.glb")
