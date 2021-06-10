import React, { useRef } from "react"
import { useGLTF, useMatcapTexture } from "@react-three/drei"

export function Arena(props) {
  const group = useRef()
  const { nodes } = useGLTF("/arena.glb")

  const [matcap] = useMatcapTexture(
    100, // index of the matcap texture https://github.com/emmelleppi/matcaps/blob/master/matcap-list.json
    1024 // size of the texture ( 64, 128, 256, 512, 1024 )
  )

  return (
    <mesh
      ref={group}
      geometry={nodes.Cube.geometry}
      scale={[325.27, 325.27, 325.27]}
    >
      <meshMatcapMaterial matcap={matcap} />
    </mesh>
  )
}

useGLTF.preload("/arena.glb")
