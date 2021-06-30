// Player controls originally adapted from https://codesandbox.io/s/minecraft-vkgi6

import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { Object3D, Vector3 } from "three"
import { TICK_INTERVAL } from "../config"
import { sendPlayerData } from "../socket"
import { useInterval } from "../utils/useInterval"
import { useStore } from "../store"

const SPEED = 2
const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right" }
const moveFieldByKey = (key) => keys[key]
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })
  useEffect(() => {
    const handleKeyDown = (e) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
    const handleKeyUp = (e) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])
  return movement
}

export const Player = (props) => {
  const { forward, backward, left, right } = usePlayerControls()
  const { camera } = useThree()
  const ref = useRef(new Object3D())
  const velocity = useRef(new Vector3(0, 0, 0))
  const { currentPopup } = useStore((state) => state)
  const isShowingAdminControls = useStore(
    (state) => state.isShowingAdminControls
  )

  useFrame(() => {
    // dont update player position if there's a popup
    if (currentPopup !== null || isShowingAdminControls) return

    camera.position.copy(ref.current.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)
    velocity.current.set(direction.x, direction.y, direction.z)
    ref.current.position.add(velocity.current)
  })

  useInterval(() => {
    sendPlayerData({
      position: ref.current.position.toArray(),
      rotation: camera.rotation.toArray(),
    })
  }, TICK_INTERVAL)

  return <mesh ref={ref} />
}
