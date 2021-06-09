import { Stats } from "@react-three/drei"
import { useStore } from "../store"

export function DebugInfo() {
  const latency = useStore((state) => state.latency)

  return (
    <>
      <Stats showPanel={0} />
      <div className="extra-stats">Latency: {latency}</div>
    </>
  )
}
