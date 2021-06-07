import { Avatar } from "./Avatar"
import { Arena } from "./Arena"
import { useStore } from "../store"

export function World() {
  const players = useStore((state) => state.players)

  return (
    <>
      {players.map((p, i) => (
        <Avatar key={p.id} position={p.position} rotation={p.rotation} />
      ))}

      <Arena />
    </>
  )
}
