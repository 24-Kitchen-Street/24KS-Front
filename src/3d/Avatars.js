import { useEffect, useState } from "react"
import { Color } from "three"
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

export function Avatars() {
  const players = useStore((state) => state.players)
  const me = useStore((state) => state.me)

  const [humans, setHumans] = useState([])
  const [bots, setBots] = useState([])

  useEffect(() => {
    setHumans(players.filter(({ id, isDummy }) => id !== me.id && !isDummy))
    setBots(players.filter(({ isDummy }) => isDummy))
  }, [players, me.id])

  return (
    <>
      <InstancedAvatars materialConfig={matA} players={humans} />
      <InstancedAvatars materialConfig={matB} players={bots} />
      {players.map((player) => (
        // TODO: Filter out ME
        // perf problems
        <AvatarUI key={player.id} {...player} />
      ))}
    </>
  )
}
