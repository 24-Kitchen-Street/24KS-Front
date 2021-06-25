import { useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { Color, Vector3 } from "three"
import { useStore } from "../store"
import { AvatarUI } from "./AvatarUI"
import { InstancedAvatars } from "./InstancedAvatars"

const matA = {
  speed: 10,
  color: new Color(0x1bfc8f),
  roughness: 0,
  metalness: 1,
  opacity: 0.8,
  transparent: true,
  wireframe: false,
  time: 0,
  frequency: 0.5,
  amplitude: 0.5,
}

const matB = {
  speed: 5,
  color: new Color(0xed4fff),
  roughness: 0,
  metalness: 1,
  opacity: 0.8,
  transparent: true,
  wireframe: false,
  time: 0,
  frequency: 0.2,
  amplitude: 0.5,
}

const tempPos = new Vector3()

export function Avatars() {
  const players = useStore((state) => state.players)
  const me = useStore((state) => state.me)

  const [humans, setHumans] = useState([])
  const [bots, setBots] = useState([])
  const [nearByPlayers, setNearby] = useState([])

  const { camera } = useThree()

  useEffect(() => {
    // TODO: could probably do this with one big loop rather than 3 filters
    setHumans(players.filter(({ id, isDummy }) => id !== me.id && !isDummy))
    setBots(players.filter(({ isDummy }) => isDummy))
    setNearby(
      players.filter(({ position, id }) => {
        tempPos.set(...position)
        return id !== me.id && tempPos.distanceTo(camera.position) < 20
      })
    )
  }, [players, me.id, camera.position])

  return (
    <>
      <InstancedAvatars materialConfig={matA} players={humans} />
      <InstancedAvatars materialConfig={matB} players={bots} />
      {nearByPlayers.map((player) => (
        <AvatarUI key={player.id} {...player} />
      ))}
    </>
  )
}
