import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { useFrame, useResource  } from "@react-three/fiber";
import { MeshDistortMaterial, useTexture} from "@react-three/drei";

import { ShaderTestMaterial } from "./ShaderTestMaterial"
import { AcidMaterial } from "./AcidMaterial"

const shaderMat = new ShaderTestMaterial()
const acidMat = new AcidMaterial()


// const envTexture = new THREE.TextureLoader();
// envTexture.load('_front.png', function (texture){
//          const material = new THREE.MeshBasicMaterial();
//          material.envMap = texture;
// });

export function FloatingTubes(props) {
    // const envMap = useTexture("_front.png", { path: "/Spacebox1" })
    const ref = useRef()
    const mats = [shaderMat, acidMat]

    useFrame(({ clock }) => {
      mats[1].time = clock.getElapsedTime() / 20
    })
    useFrame(() => {
      ref.current.rotation.x = ref.current.rotation.y += 0.01;
    });
  
    return (
      <>
        <mesh
        ref = {ref}
        // material = {mats[1]}
        position= {props.position}
        >        
            <boxBufferGeometry attach="geometry" args={[20, 10, 10, 16]} />
  
            <meshPhongMaterial color={"#FF1493"} />
            
        </mesh>      
   
      </>
  )
}