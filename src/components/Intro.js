import { useState } from "react";
import { useStore } from "../store"
import { Overlay } from "./Overlay"
import styled from "styled-components"

const Instructions = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem;
  flex-direction: column;
  background: black;
  font-family: 'Libre Baskerville', serif;
  color: white;
`

const List = styled.ul `
list-style: none;
z-index: 99999999;
position: absolute;
`


export function Intro() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)
  const me = useStore((state) => state.me)
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)
  const setGamePlay= useStore((state) => state.setGamePlay)


  const handleClick = () => {
    if (count === 0) {
      setText('Hey' + me.name)
      setCount(1)
    } else if (count === 1) {
      setText('Use WASD and mouse to move and look around.')  
      setCount(2)    
    } else if (count === 2) {
      setText('Press ESC when you want to stop.')
      setCount(3)
    } else if (count === 3) {
      setText('Press ENTER to chat')
      setCount(4)
    } else {
      setText('Click anywhere to begin!')
      setGamePlay(true)
      setCurrentPopup(null)
    }
      
  }
    

  return (
    <Overlay onClick={handleClick}>
      <Instructions>
        <List>
          <li>{text}</li>
          {/* <li>Press ESC when you want to stop.</li>
          <li>Press ENTER to chat</li>
          <li>Click anywhere to begin!</li> */}
        </List>  
        <button onClick={handleClick}>></button>      
      </Instructions>
    </Overlay>
  )
}
