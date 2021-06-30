import * as THREE from "three";
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
             
        </mesh>      
    </>
  )
}
