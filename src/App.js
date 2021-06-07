import "./App.css"
import { Avatar } from "./3d/Avatar"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"

function App() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Avatar />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
