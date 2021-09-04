import React from "react"
import { Arena } from "./Arena"
import { Avatars } from "./Avatars"
import { Lighting } from "./Lighting"
import { IntroRoom } from "./IntroRoom"
import { ReflectiveShape } from "./ReflectiveShape"
import { ShaderSphere } from "./ShaderSphere"
import { FloatingTubes } from "./FloatingTubes"
import { Joystick } from 'react-joystick-component';
import { ShapeOne } from "./ShapeOne"
import { TorusBufferGeometry } from "three"
import { Portal } from "./Portal"


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
      <Arena />
      <ShapeOne />



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
