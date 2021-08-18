import { useState } from "react";
import { useStore } from "../store"
import { Overlay } from "./Overlay"
import { OutlineContent } from "./OutlineContent";
import styled from "styled-components"

const ButtonContainer = styled.div `
  display: flex;
  flex-direction: row;
`

const Button = styled.div `
  border: 5px solid #00bfb6;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  border-radius: 40%;
  font-family: 'Libre Baskerville', serif;
  cursor: pointer;

`

const Instructions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem;
  flex-direction: column;
  font-family: 'Libre Baskerville', serif;
  color: #00bfb6;
`

const List = styled.ul `
list-style: none;
z-index: 99999999;
/* position: absolute; */
`


export function Intro() {
  const [text, setText] = useState('Do you know how to play?')
  const [showInstructions, setShowInstructions] = useState(false)
  const [count, setCount] = useState(0)
  const me = useStore((state) => state.me)
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)
  const setGamePlay= useStore((state) => state.setGamePlay)

  const startGame = () => {
      setGamePlay(true)
      setCurrentPopup(null)
  }

  const handleClick = () => {
    setShowInstructions(true)
    if (count === 0) {
      setText('Hey ' + me.name)
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
      setShowInstructions(false)
    }
      
  }
    

  return (
    <Overlay >
      <OutlineContent> 
        <Instructions>
          {showInstructions ? 
            <>
            <List onClick={handleClick}>
                <li>{text}</li>
                  {/* <li>Press ESC when you want to stop.</li>
                  <li>Press ENTER to chat</li>
                  <li>Click anywhere to begin!</li> */}
            </List>
            <Button onClick={handleClick}>Next</Button>
            </>  
          :
          <>
            <p>{text}</p>
            <ButtonContainer>
              <Button onClick={handleClick}>No</Button>
              <Button onClick={startGame}>Yes</Button>
            </ButtonContainer>
          </>
          }
        </Instructions>             
      </OutlineContent >
    </Overlay>
  )
}
