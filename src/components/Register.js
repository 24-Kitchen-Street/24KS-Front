import { useStore } from "../store"
import styled from "styled-components"
import { registerPlayer } from "../socket"
import { useEffect, useRef, useState } from "react"

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
  z-index: 9999999999;
`

const ErrorMessage = styled.div`
  margin-top: 1rem;
  color: red;
`

export function Register() {
  const [name, setName] = useState("")
  const { me, registerError, setCurrentPopup } = useStore((state) => state)

  const textbox = useRef(null)

  useEffect(() => {
    textbox.current.focus()
  }, [])

  useEffect(() => {
    if (me.isValid) {
      setCurrentPopup("intro")
    }
  }, [me, setCurrentPopup])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name !== "") {
      registerPlayer({
        name,
      })
    }
  }

  const handleOnChange = (e) => {
    setName(e.target.value)
  }

  return (
    <Overlay>
      <h2>Welcome!</h2>
      <p>Please enter your nickname</p>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleOnChange} ref={textbox} />
        <button>Go</button>
      </form>
      {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
    </Overlay>
  )
}
