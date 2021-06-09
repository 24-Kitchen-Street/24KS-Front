import "./App.css"
import { World } from "./3d/World"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import useKeypress from "react-use-keypress"
import { PointerLockControls } from "@react-three/drei"
import { Player } from "./3d/Player"
import { DebugInfo } from "./components/DebugInfo"
import { Register } from "./components/Register"
import { Intro } from "./components/Intro"
import { useStore } from "./store"
import { Feed } from "./components/Feed"
import { Chat } from "./components/Chat"

function App() {
  const { me, feed, currentPopup, setCurrentPopup } = useStore((state) => state)

  useKeypress("Enter", () => {
    if (me.isValid && currentPopup !== "chat") {
      setCurrentPopup("chat")
    }
  })

  useKeypress("Escape", () => {
    if (me.isValid) {
      setCurrentPopup(null)
    }
  })

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <World />
        </Suspense>
        <Player />
        {me.isValid && <PointerLockControls />}
      </Canvas>
      {
        {
          register: <Register />,
          intro: <Intro />,
          chat: <Chat />,
        }[currentPopup]
      }
      <Feed items={feed} />
      <DebugInfo showPanel={0} />
    </>
  )
}

export default App
