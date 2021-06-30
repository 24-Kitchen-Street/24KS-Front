import { useStore } from "../store"
import styled from "styled-components"
import { registerPlayer } from "../socket"
import { useEffect } from "react"
import { Formik, Form } from "formik"
import { TextField } from "./form/TextField"

const params = new URL(document.location).searchParams
const showPass = params.get("admin") === "1"

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

const FieldGroup = styled.div`
  margin-top: 1rem;
  label {
    display: block;
  }
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

  const handleSubmit = ({ name, adminPassword }) => {
    if (name !== "") {
      registerPlayer({
        name,
        adminPassword,
      })
    }
  }

  return (
    <Overlay>
      <h2>Welcome!</h2>
      <p>Please enter your nickname</p>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ name: "", adminPassword: "" }}
      >
        <Form>
          <TextField name="name" autoFocus />
          {showPass && (
            <FieldGroup>
              <label htmlFor="adminPassword">Admin Pass</label>
              <TextField name="adminPassword" type="password" />
            </FieldGroup>
          )}

          <button type="submit">Go</button>
        </Form>
      </Formik>
      {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
    </Overlay>
  )
}
