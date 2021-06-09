import "./App.css"
import { World } from "./3d/World"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { PointerLockControls } from "@react-three/drei"
import { Player } from "./3d/Player"
import { DebugInfo } from "./components/DebugInfo"
import { Intro } from "./components/Intro"
import { useStore } from "./store"

function App() {
  const me = useStore((state) => state.me)

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <World />
        </Suspense>
        <Player />
        {me.isValid && <PointerLockControls />}
      </Canvas>
      <DebugInfo showPanel={0} />
      <Intro />
    </>
  )
}

export default App
