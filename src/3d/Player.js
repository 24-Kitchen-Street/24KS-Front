// Player controls originally adapted from https://codesandbox.io/s/minecraft-vkgi6

import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { Object3D, Vector3 } from "three"
import { CLUB_ENTRANCE, INTRO_POSITION, TICK_INTERVAL } from "../config"
import { sendPlayerData } from "../socket"
import { useInterval } from "../utils/useInterval"
import { useStore } from "../store"
import { bounds } from "./Arena"

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

  const leftjoyX = useStore(state => state.leftjoyX)
  const leftjoyY = useStore(state => state.leftjoyY)

  console.log(leftjoyX, leftjoyY)


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
  const [currBound, setCurrBound] = useState("corridor")
  const { camera } = useThree()
  const ref = useRef(new Object3D())
  const velocity = useRef(new Vector3(0, 0, 0))
  const currentPopup = useStore((state) => state.currentPopup)
  const me = useStore((state) => state.me)
  const isShowingAdminControls = useStore(
    (state) => state.isShowingAdminControls
  )
    // if (is mobile device / small device)
//   useEffect(() => {
//      updatePointerLock
//     function onMouseMove( event ) {
//       const _PI_2 = Math.PI / 2;
//       const scope = this;
//       this.minPolarAngle = 0; // radians
//       this.maxPolarAngle = Math.PI; // radians
//       if (scope.isLocked === false ) return;
    
//       const movementX = event.movementX;
//       const movementY = event.movementY;
    
//       camera.y -= movementX * 0.002;
//       camera.y -= movementY * 0.002;
    
//       camera.x = Math.max( _PI_2 - scope.maxPolarAngle, Math.min( _PI_2 - scope.minPolarAngle, camera.x ) );
     
//   }
// } , [])

  useEffect(() => {
    if (me.hasRegistered) {
      camera.position.set(...CLUB_ENTRANCE)
      ref.current.position.set(...CLUB_ENTRANCE)
    } else {
      const [x, y, z] = INTRO_POSITION
      const offset = 10
      camera.position.set(x, y, z + offset)
      ref.current.position.set(x, y, z + offset)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me.hasRegistered])

  useFrame(() => {
    // dont update player position if there's a popup
    if (currentPopup !== null || isShowingAdminControls) return

    const currPos = ref.current.position

    camera.position.copy(currPos)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    //x y stays 0, backwards = true, 1 -1, 0 or 1
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)
    velocity.current.set(direction.x, direction.y, direction.z)
    currPos.add(velocity.current)

    // Constrain position to club walls
    if (currBound === "corridor") {
      bounds.corridor.clampPoint(currPos, currPos)

      if (bounds.dancefloor.containsPoint(currPos)) {
        setCurrBound("dancefloor")
      }
    } else if (currBound === "dancefloor") {
      bounds.dancefloor.clampPoint(currPos, currPos)

      if (bounds.corridor.containsPoint(currPos)) {
        setCurrBound("corridor")
      }
    }
  })

  useInterval(() => {
    sendPlayerData({
      position: ref.current.position.toArray(),
      rotation: camera.rotation.toArray(),
    })

  }, TICK_INTERVAL)

  return <mesh ref={ref} />
}
