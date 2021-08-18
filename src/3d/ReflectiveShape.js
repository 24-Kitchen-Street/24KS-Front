import * as THREE from "three";
<<<<<<< HEAD
import { useThree, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { MeshDistortMaterial } from "@react-three/drei";


export function ReflectiveShape() {
    const main = useRef()
    const { width, height } = useThree().size
    //  rotation following positions
    // useFrame(({ clock, mouse }) => {
    //     main.current.rotation.z = clock.getElapsedTime()
    //     main.current.rotation.y += (mouse.current[0] / (width / 2) - main.rotation.y) * 0.1
    //     main.current.rotation.x += (mouse.current[1] / (height / 2) - main.rotation.x) * 0.1
    // })
    const imgArray= ["/_back.png", "/_bottom.png", "/_front.png", "/_left.png", "/_right.png", "/_top.png"]
    const [ envMap, set ] = useState()
    useEffect(() => void new THREE.CubeTextureLoader().load(imgArray, set), [])
    return (
    <>
        <mesh>   
            <MeshDistortMaterial
                // ref={matRef}
                envMap={envMap}
                // bumpMap={bumpMap}
                color={"#FF1493"}
                roughness={0.1}
                metalness={1}
                bumpScale={0.005}
                clearcoat={1}
                clearcoatRoughness={1}
                radius={1}
                distort={0.6}
              />
              <torusBufferGeometry ref={main} args={[0.5, 64, 64]} position={[ 0,0,0 ]} />
=======
import React, { Suspense, useRef, useState } from "react";
import { useFrame, useResource  } from "@react-three/fiber";
import { MeshDistortMaterial, useTexture} from "@react-three/drei";
import { ShapeOne } from './ShapeOne';



// const envTexture = new THREE.TextureLoader();
// envTexture.load('_front.png', function (texture){
//          const material = new THREE.MeshBasicMaterial();
//          material.envMap = texture;
// });

export function ReflectiveShape() {
    // const envMap = useTexture("_front.png", { path: "/Spacebox1" })
    const ref = useRef()


    return (
    <>
        <mesh>            
            <meshStandardMaterial color="pink" attach="material" />
              {/* <meshBasicMaterial color={"#FF1493"} /> */}
              <ShapeOne />
>>>>>>> 04d4dc80f760fcf3c9f1dec0b90a62ef231dd3a0
             
        </mesh>      
    </>
  )
}
