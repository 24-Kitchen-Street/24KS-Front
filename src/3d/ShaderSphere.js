import React, { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three";

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
      vec3 colorA = vec3(0.199,0.041,0.912);
      vec3 colorB = vec3(1.000,0.033,0.224);
      uniform float u_time;

  
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(0.0);
        float cb = floor((uv.x + abs(sin(u_time)))*40.) + floor((uv.y + abs(sin(u_time)))*40.);
        color = mix(colorA, colorB, mod(cb, 3.0));
        gl_FragColor = vec4(color, u_time);
        
      }
    `

  
 export function ShaderSphere (props) {
    const sphereRef = useRef();
  

    const uniforms = useMemo(
        () => ({
                u_time: { type: "f", value: 0 },
                colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
        }),
        []
      )
    

    useFrame(({ clock }) => {
      sphereRef.current.material.uniforms.u_time.value = clock.oldTime * 0.00005;
    });
  
    return (
      <mesh ref={sphereRef} {...props}>
        <sphereGeometry  args={[20, 46, 46]}  />
        <shaderMaterial
                attach="material"
                uniforms={uniforms}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
            
                vertexColors />
      </mesh>
    );
  };
