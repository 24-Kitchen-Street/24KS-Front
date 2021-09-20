import * as THREE from "three";
import React, { useRef } from "react";
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
             
        </mesh>      
    </>
  )
}
