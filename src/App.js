import "./App.css"
import { World } from "./3d/World"
import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { PointerLockControls } from "@react-three/drei"
import { Player } from "./3d/Player"
import { DebugInfo } from "./components/DebugInfo"
import { Intro } from "./components/Intro"
import { useStore } from "./store"
import { Feed } from "./components/Feed"

function App() {
  const me = useStore((state) => state.me)
  const feed = useStore((state) => state.feed)

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <World />
        </Suspense>
        <Player />
        {me.isValid && <PointerLockControls />}
      </Canvas>
      <Feed items={feed} />
      <DebugInfo showPanel={0} />
      <Intro />
    </>
  )
}

export default App
