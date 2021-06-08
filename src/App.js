import "./App.css"
import { World } from "./3d/World"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { PointerLockControls } from "@react-three/drei"
import { Player } from "./3d/Player"

function App() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <World />
        </Suspense>
        <Player />
        <PointerLockControls />
      </Canvas>
    </>
  )
}

export default App
