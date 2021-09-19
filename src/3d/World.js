import React from "react"
import { Arena } from "./Arena"
import { Avatars } from "./Avatars"
import { Lighting } from "./Lighting"
import { FloatingTubes } from "./FloatingTubes"
import { Discoball } from "./Discoball"


export function World() {
  return (
    <>
      <Lighting />
      <Avatars />
      <FloatingTubes />
      {/* get these shapes instanced nicely! */}
        <FloatingTubes position={[10, 10, 10]}/>
        <FloatingTubes position={[-50, -20, 50]}/>
        <FloatingTubes position={[50, 10, 80]}/>
        <FloatingTubes position={[0, 30, 80]}/>
        <FloatingTubes position={[0, -40, 90]}/>
        <Discoball position= {[0,0,0]} />

      <Arena />




      {/* <mesh 
      scale={[10, 10, 10]}
      >
      <sphereGeometry args={[3.8, 1.2, 48, 64]} />
      <meshPhongMaterial shininess="1.0" attach="material"/>
    </mesh> */}
      {/* <ReflectiveShape /> */}
    </>
  )
}
