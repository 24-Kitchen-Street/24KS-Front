import { Stats } from "@react-three/drei"
import styled from "styled-components"
import { useStore } from "../store"

const ExtraStats = styled.div`
  position: absolute;
  top: 0;
  left: 80px;
  padding: 3px;
  color: white;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.5);
`

export function DebugInfo() {
  const latency = useStore((state) => state.latency)

  return (
    <>
      <Stats showPanel={0} />
      <ExtraStats>Latency: {latency}</ExtraStats>
    </>
  )
}
