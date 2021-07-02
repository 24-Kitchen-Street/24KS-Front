import { useFrame, useThree } from "@react-three/fiber"
import React, { useEffect, useRef } from "react"
import { Color } from "three"

const colorA = new Color("#fa34fa")
const colorB = new Color("#15e6df")

export function Lighting() {
  const danceLight0 = useRef()
  const dirLight = useRef()

  const { scene } = useThree()

  useEffect(() => {
    scene.add(dirLight.current.target)
  }, [scene])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    danceLight0.current.position.x = Math.sin(t) * 40
    danceLight0.current.position.z = Math.cos(t * 2) * 30
    dirLight.current.intensity = Math.sin(t) * 0.5
    dirLight.current.target.position.x = Math.sin(t)
    dirLight.current.target.position.y = Math.cos(t * 1.5)
    dirLight.current.target.position.z = Math.cos(t)
  })
  return (
    <>
      <directionalLight ref={dirLight} color={colorB} />
      <pointLight distance={100} position={[0, 0, 500]} color={colorA} />
      <pointLight distance={100} position={[0, 0, 200]} color={colorB} />
      <pointLight
        ref={danceLight0}
        distance={100}
        intensity={10}
        color={colorA}
      />

      <pointLight
        ref={danceLight0}
        distance={100}
        intensity={10}
        color={colorB}
      />
    </>
  )
}
