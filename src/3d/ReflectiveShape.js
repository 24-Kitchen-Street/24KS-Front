import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { useFrame, useResource  } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, useCubeTexture, useTexture} from "@react-three/drei";


function Movement({material}) {
    const main = useRef()
     // rotation following positions
    useFrame(({ clock, mouse }) => {
        main.current.rotation.z = clock.getElapsedTime()
        main.current.rotation.y = THREE.MathUtils.lerp(main.current.rotation.y, mouse.x * Math.PI, 0.1)
        main.current.rotation.x = THREE.MathUtils.lerp(main.current.rotation.x, mouse.y * Math.PI, 0.1)
    })
    return (
    <Icosahedron args={[1, 4]} ref={main}  position={[ 0,0,0 ]} />
    )
}

export function ReflectiveShape() {
    // const bumpMap = useTexture("/bump.jpg")
    const envMap = useCubeTexture(["_back.png", "_bottom.png", "_front.png", "_left.png", "_right.png", "_top.png"], { path: "/Spacebox1" })
    // const [matRef, material] = useResource()
    // const [material, set] = useState()
    const ref = useRef()


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
                distort={0.4}
              />
              <Movement />
             
        </mesh>

              {/* {material && <Movement material={material} />} */}
      
    </>
  )
}
