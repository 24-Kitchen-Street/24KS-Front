import "./App.css"
import { World } from "./3d/World"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"

function App() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
