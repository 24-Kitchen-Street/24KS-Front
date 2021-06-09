import { useStore } from "../store"
import styled from "styled-components"
import { registerPlayer } from "../socket"
import { useState } from "react"

const Overlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
`

export function Intro() {
  const [name, setName] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const me = useStore((state) => state.me)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)

    registerPlayer({
      name,
    })
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
            </>
          )}

          {me.name && <p>Hey {me.name}, click anywhere to start! :)</p>}
        </Overlay>
      )}
    </>
  )
}
