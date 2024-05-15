import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {
    LOGO_INTRO_POSITION,
    LOGO_CLUB_POSITION
  } from "../config"
import { useStore } from "../store"

export function Logo(props) {
    const group = useRef()
    const mesh = useRef()
    const me = useStore((state) => state.me)
    const { nodes, materials } = useGLTF('/ClubGeistLogoCleanUP.gltf')
    useFrame(() => {
        if (me.hasRegistered) {
         
          mesh.current.rotation.y += 0.01;
          mesh.current.rotation.x += 0.01;
          mesh.current.rotation.z -= 0.01;
      
        } else {
            mesh.current.rotation.x += 0.01;
        }
        
      });
      useEffect(() => {
        if (me.hasRegistered) {
            group.current.position.set(...LOGO_CLUB_POSITION)
            mesh.current.scale.set(215, 215, 215)
        } else {
            group.current.position.set(...LOGO_INTRO_POSITION)
            mesh.current.scale.set(43, 43, 43)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [me.hasRegistered])
    return (
        <group ref={group} {...props} dispose={null}>
        <mesh
            ref= {mesh}
            castShadow
            receiveShadow
            geometry={nodes.Curve005.geometry}
            material={materials.SVGMat}
            // rotation={[Math.PI / 2, 0, 0]}
            // scale={[(40.86, 40.86, 40.86)]}

        />
        </group>
  )
}

useGLTF.preload('/ClubGeistLogoCleanUP.gltf')