import { useStore } from "../store"
import styled from "styled-components"
import { registerPlayer } from "../socket"
import { useState } from "react"

const Overlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  flex-direction: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
`

const ErrorMessage = styled.div`
  margin-top: 1rem;
  color: red;
`

export function Intro() {
  const [name, setName] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const me = useStore((state) => state.me)
  const error = useStore((state) => state.registerError)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name !== "") {
      registerPlayer({
        name,
      })
    }
  }

  const handleClick = () => {
    // If we're ready to go, click hides overlay
    if (me.isValid) setIsVisible(false)
  }

  const handleOnChange = (e) => {
    setName(e.target.value)
  }

  return (
    <>
      {isVisible && (
        <Overlay onClick={handleClick}>
          {!me.isValid && (
            <>
              <h2>Welcome!</h2>
              <p>Please enter your nickname</p>
              <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleOnChange} />
                <button>Go</button>
              </form>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </>
          )}

          {me.name && (
            <>
              <p>Hey {me.name}!</p>
              <ul>
                <li>Use WASD and mouse to move and look around.</li>
                <li>Press ESC when you want to stop.</li>
                <li>Click anywhere to begin!</li>
              </ul>
            </>
          )}
        </Overlay>
      )}
    </>
  )
}
