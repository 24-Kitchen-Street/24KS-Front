/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Discoball(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/discoball.gltf')
  useFrame(() => {
    group.current.rotation.y += 0.001;
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_Untitled285.geometry}
        material={materials['Material.001']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[40, 40, 40]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Discosphere_Untitled082.geometry}
        material={materials.chrome01}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[40, 40, 40]}
      />
    </group>
  )
}

useGLTF.preload('/discoball.gltf')
