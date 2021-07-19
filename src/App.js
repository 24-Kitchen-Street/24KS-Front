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
import { ErrorScreen } from "./components/ErrorScreen"
import { AdminUI } from "./components/AdminUI"
import { JoySticks } from './components/JoySticks';

function App() {
  // const handleMove = useStote((state) => state.)

  const me = useStore((state) => state.me)
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)
  const currentPopup = useStore((state) => state.currentPopup)
  const isShowingAdminControls = useStore(
    (state) => state.isShowingAdminControls
  )

  useKeypress("Enter", () => {
    if (me.isValid && currentPopup !== "chat" && !isShowingAdminControls) {
      setCurrentPopup("chat")
    }
  })

  useKeypress("Escape", () => {
    if (me.isValid) {
      setCurrentPopup(null)
    }
  })

  const handleMove = () => {

  }

  const handleStop = () => {

  }

  return (
    <>
    <JoySticks />
     <Canvas>
        <Suspense fallback={null}>
          <World />
        </Suspense>
        <Player />
        {me.isValid && <PointerLockControls />}
        
      </Canvas>
      {
        // Only one of these popups can display at a time
        // This is essentially a switch statement, its just neater as an object!
        {
          register: <Register />,
          intro: <Intro />,
          chat: <Chat />,
          error: <ErrorScreen />,
        }[currentPopup]
      }
      <Feed />
      <DebugInfo />
      {me.isAdmin && <AdminUI />}
    </>
  )
}

export default App
