import React, { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three";

export const vertexShader = `
      precision mediump float;
      varying vec2 vUv;
      void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
          gl_Position = projectionMatrix * mvPosition;
          vUv = uv;
      }
    `
export const fragmentShader = `
      varying vec2 vUv;
      uniform float u_time;
  
      void main() {
        vec2 uv = vUv;
        float cb = floor((uv.x + u_time)*20.) + floor((uv.y + u_time)*20.);
        gl_FragColor = vec4(0.,0.1,0.,mod(cb, 4.0));
      }
    `

  
 export function ShaderSphere (props) {
    const sphereRef = useRef();
  

    const uniforms = useMemo(
        () => ({
                u_time: { type: "f", value: 0 }
        }),
        []
      )
    

    useFrame(({ clock }) => {
      sphereRef.current.material.uniforms.u_time.value = clock.oldTime * 0.00005;
    });
  
    return (
      <mesh ref={sphereRef} {...props}>
        <sphereGeometry args={[2, 24, 24]} />
        <shaderMaterial
                attach="material"
                uniforms={uniforms}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                blending={THREE.AdditiveBlending}
                transparent
                vertexColors />
      </mesh>
    );
  };
