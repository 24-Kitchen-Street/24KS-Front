import React from "react"
import { Arena } from "./Arena"
import { Avatars } from "./Avatars"
import { Lighting } from "./Lighting"
import { IntroRoom } from "./IntroRoom"
import { ReflectiveShape } from "./ReflectiveShape"
import { ShaderSphere } from "./ShaderSphere"
import { TwistedShape } from "./TwistedShape"
import { Joystick } from 'react-joystick-component';
import { ShapeOne } from "./ShapeOne"
import { TorusBufferGeometry } from "three"


export function World() {
  return (
    <>
      <Lighting />
      <Avatars />
      <TwistedShape />
      {/* get these shapes instanced nicely! */}
        <TwistedShape position={[10, 10, 10]}/>
        <TwistedShape position={[-50, -20, 50]}/>
        <TwistedShape position={[50, 10, 80]}/>
        <TwistedShape position={[0, 30, 80]}/>
        <TwistedShape position={[0, -40, 90]}/>
      <Arena />
      
      {/* <ShapeOne /> */}
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
