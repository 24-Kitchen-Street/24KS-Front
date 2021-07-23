import React, { useEffect } from "react"
import { useGLTF } from "@react-three/drei"


export function ShapeOne() {
  const { nodes } = useGLTF("/distorted1.glb")

  return <primitive object={nodes} scale={100} />
}

useGLTF.preload("/distorted1.glb");
