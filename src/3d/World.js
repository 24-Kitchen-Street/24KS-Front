import { Avatar } from "./Avatar"
import { Arena } from "./Arena"
import { useStore } from "../store"
import { useFrame } from "@react-three/fiber"

export function World() {
  const players = useStore((state) => state.players)
  const updatePlayers = useStore((state) => state.updatePlayers)

  useFrame(() => {
    updatePlayers()
  })

  return (
    <>
      {players.map((p, i) => (
        <Avatar key={p.id} position={p.position} rotation={p.rotation} />
      ))}

      <Arena />
    </>
  )
}
