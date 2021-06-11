import React, { useRef, useState } from "react"
import { Html } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import styled from "styled-components"
import { Vector3 } from "three"

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

const tempPos = new Vector3()

export function AvatarUI(props) {
  const group = useRef()
  const [isVisible, setIsNameVisible] = useState(false)
  const { camera } = useThree()

  useFrame(() => {
    tempPos.set(...props.position)
    setIsNameVisible(tempPos.distanceTo(camera.position) < 20)

    if (isVisible) {
      group.current.position.copy(tempPos)
      group.current.rotation.set(...props.rotation)
    }
  })

  return (
    <group ref={group}>
      {isVisible && (
        <>
          <Html distanceFactor={100} center position={[0, 5, 0]}>
            <NameTag>{props.name}</NameTag>
          </Html>
          <Html distanceFactor={100} position={[0, 3, 0]}>
            {props.lastMessage && <Message>{props.lastMessage}</Message>}
          </Html>
        </>
      )}
    </group>
  )
}
