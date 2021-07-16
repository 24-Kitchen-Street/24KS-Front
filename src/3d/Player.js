// Player controls originally adapted from https://codesandbox.io/s/minecraft-vkgi6

import React, { useEffect, useRef, useState } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { Object3D, Vector3 } from "three"
import {
  CAM_CHANGE_RATE,
  CLUB_ENTRANCE,
  INTRO_POSITION,
  TICK_INTERVAL,
} from "../config"
import { sendPlayerData } from "../socket"
import { useInterval } from "../utils/useInterval"
import { useStore } from "../store"
import { bounds } from "./Arena"

const SPEED = 2
const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right" }
const moveFieldByKey = (key) => keys[key]
const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()
const center = new Vector3(0, 0, 0)
const tempVec = new Vector3(0, 0, 0)

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
  const [currBound, setCurrBound] = useState("corridor")
  const { camera } = useThree()
  const ref = useRef(new Object3D())
  const velocity = useRef(new Vector3(0, 0, 0))
  const currentPopup = useStore((state) => state.currentPopup)
  const updateClubMode = useStore((state) => state.updateClubMode)
  const clubMode = useStore((state) => state.clubMode)

  const me = useStore((state) => state.me)
  const isShowingAdminControls = useStore(
    (state) => state.isShowingAdminControls
  )

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

  useFrame(({ clock }) => {
    // dont update player position if there's a popup
    if (currentPopup !== null || isShowingAdminControls) return

    const currPos = ref.current.position

    if (clubMode.isEnabled) {
      const state = useStore.getState()
      let skipFollow = false

      if (clubMode.lastChange + CAM_CHANGE_RATE < Date.now()) {
        updateClubMode({
          followingIndex:
            clubMode.followingIndex === -1
              ? Math.floor(Math.random() * state.players.length)
              : -1,
          lastChange: Date.now(),
        })
      }

      if (clubMode.followingIndex !== -1) {
        // Follow a player
        const player = state.players[clubMode.followingIndex]

        if (player && player.id !== me.id) {
          const [x, y, z] = player.position
          currPos.set(x, y, z + 10)
          tempVec.set(0, 0, 10)
          camera.rotation.set(0, 0, 0)
        } else {
          // Dont do follow if its me (the camera ghost)
          skipFollow = true
        }
      }

      if (clubMode.followingIndex === -1 || skipFollow) {
        // Move the camera automatically in club mode
        const t = clock.getElapsedTime()

        const x = Math.cos(t * 0.2) * 80
        const y = Math.sin(t * 0.05) * 80
        const z = Math.sin(t * 0.1) * 80

        currPos.set(x, y, z)
        camera.lookAt(center)
      }
    } else {
      frontVector.set(0, 0, Number(backward) - Number(forward))
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
    }

    camera.position.copy(currPos)
  })

  useInterval(() => {
    sendPlayerData({
      position: ref.current.position.toArray(),
      rotation: camera.rotation.toArray(),
    })
  }, TICK_INTERVAL)

  return <mesh ref={ref} />
}
