import styled from "styled-components"
import { sendChatMessage } from "../socket"
import { useStore } from "../store"
import { Form, Formik } from "formik"
import { TextField } from "./form/TextField"

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
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)

  const handleSubmit = ({ message }) => {
    if (message !== "") {
      sendChatMessage({
        message: message,
      })

      setCurrentPopup(null)
    }
  }

  return (
    <Overlay>
      <Formik onSubmit={handleSubmit} initialValues={{ message: "" }}>
        <Form>
          <TextField name="message" autoFocus />
          <button>Go</button>
        </Form>
      </Formik>
    </Overlay>
  )
}
