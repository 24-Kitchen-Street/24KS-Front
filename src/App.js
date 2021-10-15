import "./App.css"
import { World } from "./3d/World"
import { Suspense, useEffect } from "react"
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
import { SHOW_DEBUG } from "./config"
import { FollowingUI } from "./components/FollowingUI"
import { JoySticks } from "./components/JoySticks"
import { isTouchDevice } from "./utils/isTouchDevice"
import { ChatButton } from "./components/ChatButton"
import { Tips } from "./components/Tips"

function App() {
  const me = useStore((state) => state.me)
  const isClubModeEnabled = useStore((state) => state.clubMode.isEnabled)
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)
  const currentPopup = useStore((state) => state.currentPopup)
  const isShowingAdminControls = useStore(
    (state) => state.isShowingAdminControls
  )

  useEffect(() => {
    document.body.classList.toggle("cursorHidden", isClubModeEnabled)
  }, [isClubModeEnabled])

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

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <World />
        </Suspense>
        <Player />
        {me.isValid && !isTouchDevice() && <PointerLockControls />}
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
      {me.isValid && !isClubModeEnabled && <Feed />}
      {isClubModeEnabled && <FollowingUI />}
      {SHOW_DEBUG && <DebugInfo />}
      {me.isAdmin && <AdminUI />}
      {me.isValid && !isTouchDevice() && <Tips />}
      {me.isValid && isTouchDevice() && <JoySticks />}
      {me.isValid && isTouchDevice() && <ChatButton />}
    </>
  )
}

export default App
