import * as THREE from "three"
import React, { useEffect, useRef, useState, useMemo } from "react"
import { useThree, useFrame } from "@react-three/fiber"
// import { MeshDistortMaterial } from "@react-three/drei"
import { EffectComposer, DepthOfField, Bloom, Noise } from "react-postprocessing";

const textureUrl = './AmbientOcc.jpg';


const useResize = (portalRef) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWidth(portalRef.current.offsetWidth)
      setHeight(portalRef.current.offsetHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [portalRef])

  return { width, height }
}


export const vertexShader = `
      precision mediump float;
      // determines how much precision the GPU uses when calculating floats
      // some systems do not support highhp
      
      varying vec2  vUv;
      void main()	{
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `
export const fragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;

const int AMOUNT = 12;

void main(){
	vec2 coord = 20.0 * (gl_FragCoord.xy - u_resolution / 2.0) / min(u_resolution.y, u_resolution.x);

	float len;

	for (int i = 0; i < AMOUNT; i++){
		len = length(vec2(coord.x, coord.y));

		coord.x = coord.x - cos(coord.y + sin(len)) + cos(u_time / 1.0);
		coord.y = coord.y + sin(coord.x + cos(len)) + sin(u_time / 12.0);
	}

	gl_FragColor = vec4(cos(len * 1.0), cos(len * 2.0), cos(len * 4.0), 1.0);

	// vec3 color = vec3(cos(len * 5.0), cos(len * 1.0), cos(len * 7.0));
	// gl_FragColor = vec4(color, 1.0);
}
    `


export const Portal = (props) => {
    const portalRef = useRef()
  // console.log(width, height)
    const uniforms = useMemo(
        () => ({
                u_time: { type: "f", value: 1.0 },
                u_resolution: { type: "vec2", value: new THREE.Vector2( window.innerWidth, window.innerHeight)}
                // texture: {type: "t", value: new THREE.TextureLoader().load( "./AmbientOcc.jpg" )}
                // colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
        }),
        []
      )
    useFrame(({ clock }) => {
        portalRef.current.material.uniforms.u_time.value = clock.oldTime * 0.00005;
      });
  return (
    <mesh ref={portalRef} {...props} position={[0,0,-5]} rotation={[0, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[6, 9]}/>
            <shaderMaterial
                attach="material"
                uniforms={uniforms}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                vertexColors />
    </mesh>
  ) 
}
