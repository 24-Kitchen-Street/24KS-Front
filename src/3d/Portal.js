import * as THREE from "three"
import React, { useEffect, useRef, useState, useMemo } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import { EffectComposer, DepthOfField, Bloom, Noise } from "react-postprocessing";


export const vertexShader = `
      precision mediump float;
      // determines how much precision the GPU uses when calculating floats
      // some systems do not support highhp
      varying vec2 vUv;
      void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
          gl_Position = projectionMatrix * mvPosition;
          vUv = uv;
      }
    `
export const fragmentShader = `
      varying vec2 vUv;
      vec3 colorA = vec3(0.09,0.041,1.0);
      uniform float u_time;

  
      void main() {
          vec2 uv = vUv;
          float cb = floor((uv.y + u_time) * 10.);
          gl_FragColor = vec4( mod(cb, 1.5 ), colorA );
        
      }
    `

export const Portal = (props) => {
    const portalRef = useRef()

    const uniforms = useMemo(
        () => ({
                u_time: { type: "f", value: 1 },
                // colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
        }),
        []
      )
    useFrame(({ clock }) => {
        portalRef.current.material.uniforms.u_time.value = clock.oldTime * 0.00005;
      });
  return (
    <mesh ref={portalRef} {...props} position={[0,0,-2]}>
            <planeBufferGeometry attach="geometry" args={[3, 7]}/>
            <shaderMaterial
                attach="material"
                uniforms={uniforms}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                vertexColors />
    </mesh>
  ) 
}
