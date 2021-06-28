import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";


const ROW = 50
const COL = 50
const NUM = ROW * COL

export const vertexShader = `
    uniform float time;
      attribute float size;
      void main() {
        float PI = 3.1415926538;
        float x = position.x;
        float y = position.y;
        float id = position.z;
        float ROW = 50.;
        float COL = 50.;
        float NUM = ROW * COL;
        vec3 pos = vec3(
          x / 3. - 7. + (sin(x) * PI) / 10.,
          (y - ROW / 2.) / 3. + (cos(y) * PI) / 10.,
          -10. +
            (cos((4. * PI * (x - COL / 2.)) / COL + time) + sin((8. * PI * (y - ROW / 2.)) / ROW + time)) +
            0.2 * (cos((12. * PI * (x - COL / 2.)) / COL + time) + sin((17. * PI * (y - ROW / 2.)) / ROW + time))
        );
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0 );
        gl_PointSize = size;
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

function Particles({ pointCount }) {
  const [coords, sizes] = useMemo(() => {
    const initialCoords = []
    const initialSizes = []
    let i = 0
    for (let y = 0; y < ROW; y += 1) {
      for (let x = 0; x < COL; x += 1) {
        initialCoords.push(x)
        initialCoords.push(y)
        initialCoords.push(i)
        initialSizes.push(Math.random() < 0.03 ? 15 : 6)
        i++
      }
    }

    const coords = new Float32Array(initialCoords)
    const sizes = new Float32Array(initialSizes)
    return [coords, sizes]
  }, [pointCount])

  const geom = useRef()
  useFrame((state) => {
    geom.current.material.uniforms.time.value = state.clock.getElapsedTime()
    geom.current.geometry.verticesNeedUpdate = true
  })

  const uniforms = useMemo(
    () => ({
            u_time: { type: "f", value: 1 },
    }),
    []
  )

  return (
    <points ref={geom} position={[0, 10, 0]} rotation={[-Math.PI / 4, 0, Math.PI / 6]}>
      <bufferGeometry>
        <bufferAttribute attachObject={["attributes", "position"]} count={coords.length / 3} array={coords} itemSize={3} />
        <bufferAttribute attachObject={["attributes", "size"]} count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        attach="material"
        uniforms={uniforms}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        vertexColors />
    </points>
  )
}

export function Lines () {
    return (
        <Particles pointCount={NUM} />
    )
}