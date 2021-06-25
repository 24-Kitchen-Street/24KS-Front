import React from "react"
import { Html } from "@react-three/drei"
import styled from "styled-components"

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

export function AvatarUI(props) {
  return (
    <group position={props.position}>
      <Html distanceFactor={100} center position={[0, 5, 0]}>
        <NameTag>{props.name}</NameTag>
      </Html>
      <Html distanceFactor={100} position={[0, 3, 0]}>
        {props.lastMessage && <Message>{props.lastMessage}</Message>}
      </Html>
    </group>
  )
}
