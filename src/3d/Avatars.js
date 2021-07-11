import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { Vector3 } from "three"
import { useStore } from "../store"
import { AvatarUI } from "./AvatarUI"
import { InstancedAvatars } from "./InstancedAvatars"

const materialConfig = {
  roughness: 0,
  metalness: 1,
  opacity: 0.8,
  transparent: true,
  wireframe: false,
  time: 0,
  vertexColors: true,
}

const tempPos = new Vector3()

export function Avatars() {
  const players = useStore((state) => state.players)
  const me = useStore((state) => state.me)
  const skinPlayer = useStore((state) => state.skinPlayer)

  const [visiblePlayers, setVisiblePlayers] = useState([])
  const [nearByPlayers, setNearby] = useState([])

  const { camera } = useThree()

  useEffect(() => {
    if (me.isValid) {
      setVisiblePlayers(players.filter(({ id }) => id !== me.id))
    } else {
      setVisiblePlayers([skinPlayer])
    }

    setNearby(
      players.filter(({ position, id }) => {
        tempPos.set(...position)
        return id !== me.id && tempPos.distanceTo(camera.position) < 20
      })
    )
  }, [players, me.id, camera.position, me.isValid, skinPlayer])

  return (
    <>
      <InstancedAvatars
        materialConfig={materialConfig}
        players={visiblePlayers}
      />
      {nearByPlayers.map((player) => (
        <AvatarUI key={player.id} {...player} />
      ))}
    </>
  )
}
