import React, { useRef, useState } from "react"
import { Html, useGLTF } from "@react-three/drei"
import { MeshNormalMaterial, MeshBasicMaterial } from "three"
import { useFrame, useThree } from "@react-three/fiber"
import styled from "styled-components"

const dummyMat = new MeshNormalMaterial()
const mat = new MeshBasicMaterial({ wireframe: true, color: 0xffffff })

const NameTag = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 3px;
  font-size: 0.8rem;
  color: white;
  text-align: center;
  display: inline-block;
`

const Message = styled.p`
  display: block;
  font-size: 0.5rem;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  margin-left: 1rem;
  color: white;
  width: 10rem;
`

export function Avatar(props) {
  const group = useRef()
  const { nodes } = useGLTF("/avatar.glb")
  const [isNameVisible, setIsNameVisible] = useState(false)
  const { camera } = useThree()

  useFrame(() => {
    group.current.position.set(...props.position)
    group.current.rotation.set(...props.rotation)

    setIsNameVisible(group.current.position.distanceTo(camera.position) < 50)
  })

  return (
    <group ref={group}>
      {isNameVisible && (
        <>
          <Html distanceFactor={100} center position={[0, 5, 0]}>
            <NameTag>{props.name}</NameTag>
          </Html>
          <Html distanceFactor={100} position={[0, 3, 0]}>
            {props.lastMessage && <Message>{props.lastMessage}</Message>}
          </Html>
        </>
      )}
      <mesh
        geometry={nodes.tentaghost.geometry}
        material={props.isDummy ? dummyMat : mat}
      />
    </group>
  )
}

useGLTF.preload("/avatar.glb")
