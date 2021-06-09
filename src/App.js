import "./App.css"
import { World } from "./3d/World"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { PointerLockControls, Stats } from "@react-three/drei"
import { Player } from "./3d/Player"
import { useStore } from "./store"

function App() {

  const latency = useStore((state) => state.latency)

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <World />
        </Suspense>
        <Player />
        <PointerLockControls />
      </Canvas>
      <Stats showPanel={0} />
      <div className="extra-stats">
        Latency: {latency}
      </div>
      
    </>
  )
}

export default App
