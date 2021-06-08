import { Avatar } from "./Avatar"
import { Arena } from "./Arena"
import { useStore } from "../store"

export function World() {
  const players = useStore((state) => state.players)
  const me = useStore((state) => state.me)

  return (
    <>
      {players.map(
        // show all players except ourselves, based on ID
        (props, i) => props.id !== me.id && <Avatar key={props.id} {...props} />
      )}

      <Arena />
    </>
  )
}
