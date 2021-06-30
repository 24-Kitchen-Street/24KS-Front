import { Form, Formik } from "formik"
import styled from "styled-components"
import { banPlayer } from "../socket"
import { useStore } from "../store"
import { TextField } from "./form/TextField"

const UI = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 3px;
  color: white;
  background: rgba(0, 0, 0, 0.5);

  h3 {
    margin: 0;
    font-size: 16px;
    padding: 1rem;
  }

  h4 {
    font-size: 18px;
    margin: 0;
  }

  strong {
    font-size: 16px;
  }
`

export function AdminUI() {
  const handleSubmit = ({ name }) => {
    if (name !== "") {
      banPlayer({
        name,
      })
    }
  }

  const banResponse = useStore((state) => state.banResponse)
  const isShowing = useStore((state) => state.isShowingAdminControls)
  const setControls = useStore((state) => state.setIsShowingAdminControls)

  return (
    <UI onClick={(e) => e.stopPropagation()}>
      <h3 onClick={() => setControls(!isShowing)}>Admin Controls</h3>
      {isShowing && (
        <>
          <h4>Ban User</h4>
          <Formik onSubmit={handleSubmit} initialValues={{ name: "" }}>
            <Form>
              <TextField name="name" />
              <button type="submit">Go</button>
            </Form>
          </Formik>
          {banResponse && <strong>{banResponse}</strong>}
        </>
      )}
    </UI>
  )
}
