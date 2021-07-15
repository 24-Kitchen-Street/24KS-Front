import React, { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"



export function ShapeOne(props) {
  const { scene, nodes } = useGLTF("/distorted1.glb")
  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return (
    <>
    <mesh
    {...props}
    ref={mesh}
    geometry={nodes.distorted1.geometry}
    material={props.material}
    >
      <primitive object={ scene }  scale={30} />
     </mesh>
    </>
  )
}

useGLTF.preload("/distorted1.glb");
