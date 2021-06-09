import styled from "styled-components"
import { sendChatMessage } from "../socket"
import { useRef, useState, useEffect } from "react"
import { useStore } from "../store"

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

export function Chat() {
  const [message, setMessage] = useState("")
  const textbox = useRef(null)
  const { setCurrentPopup } = useStore((state) => state)

  useEffect(() => {
    textbox.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (message !== "") {
      sendChatMessage({
        message: message,
      })

      setCurrentPopup(null)
    }
  }

  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <Overlay>
      <form onSubmit={handleSubmit}>
        <h3>Message:</h3>
        <input type="text" onChange={handleOnChange} ref={textbox} />
      </form>
    </Overlay>
  )
}
