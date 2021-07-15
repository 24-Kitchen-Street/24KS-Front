import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { useFrame, useResource  } from "@react-three/fiber";
import { MeshDistortMaterial, useTexture} from "@react-three/drei";
import { ShapeOne } from './ShapeOne';


export function ReflectiveShape() {
    // const envMap = useTexture("_front.png", { path: "/Spacebox1" })
    const ref = useRef()


    return (
    <>
        <mesh>            
            <MeshDistortMaterial
                // envMap={envMap}
                // bumpMap={bumpMap}
                color={"#FF1493"}
                roughness={0.1}
                metalness={1}
                bumpScale={0.005}
                clearcoat={1}
                clearcoatRoughness={1}
                radius={1}
                distort={0.4}
              />
              {/* <meshBasicMaterial color={"#FF1493"} /> */}
              <ShapeOne />
             
        </mesh>

              {/* {material && <Movement material={material} />} */}
      
    </>
  )
}
