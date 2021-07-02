import { useStore } from "../store"
import styled from "styled-components"
import { registerPlayer } from "../socket"
import { useEffect } from "react"
import { Formik, Form } from "formik"
import { TextField } from "./form/TextField"

const Overlay = styled.div`
  position: absolute;
  display: flex;
  /* align-items: center; */
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

const Title = styled.div`
  width: 40%;
  font-size: 27px;
`

const ErrorMessage = styled.div`
  margin-top: 1rem;
  color: red;
`

export function Register() {
  const me = useStore((state) => state.me)
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)
  const registerError = useStore((state) => state.registerError)

  useEffect(() => {
    if (me.isValid) {
      setCurrentPopup("intro")
    }
  }, [me, setCurrentPopup])

  const handleSubmit = ({ name }) => {
    if (name !== "") {
      registerPlayer({
        name,
      })
    }
  }

  return (
    <Overlay>
      <Title><h1>Entering the club, ghost?</h1></Title>
      <p>Okay. Can we get your name for track and trace first?</p>
      <Formik onSubmit={handleSubmit} initialValues={{ name: "" }}>
        <Form>
          <TextField name="name" autoFocus />
          <button>Enter</button>
        </Form>
      </Formik>
      {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
    </Overlay>
  )
}
