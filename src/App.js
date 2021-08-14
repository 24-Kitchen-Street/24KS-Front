import "./App.css"
import React, {useState, useEffect} from "react"
// import Loading from "./components/Loading"
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
import { Loading } from './components/Loading';

function App() {
  // const handleMove = useStote((state) => state.)

  const me = useStore((state) => state.me)
  const isLoading = useStore((state) => state.isLoading);
  const gamePlay = useStore((state) =>state.gamePlay)
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)
  const setIsLoading = useStore((state) => state.setIsLoading);
  const currentPopup = useStore((state) => state.currentPopup)
  const isShowingAdminControls = useStore(
    (state) => state.isShowingAdminControls
  )

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  })

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

    {/* need to hide joys in intro */}

    {/* {currentPopup === "Chat" <JoySticks />} */}
    {me.isValid && <JoySticks />}
    {isLoading===true ?
        <Loading />
      :
        <>

        {/* need to hide speech in main room */}
        {gamePlay ?
        <Canvas>       
        <Suspense fallback={null}>
          <World />
        </Suspense>
        <Player />
        {me.isValid && <PointerLockControls />}     
        </Canvas> : 
        <Canvas>       
        <Suspense fallback={null}>
        </Suspense>
        <Player />
      </Canvas>
        }
        </>
    }    

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
      {me.isValid && <Feed />}
      <DebugInfo />
      {me.isAdmin && <AdminUI />}
      
    </>
  )
}

export default App
