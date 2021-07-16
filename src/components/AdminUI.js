import { Form, Formik } from "formik"
import styled from "styled-components"
import { banPlayer, unbanIP } from "../socket"
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
  const banResponse = useStore((state) => state.banResponse)
  const unbanResponse = useStore((state) => state.unbanResponse)
  const isShowing = useStore((state) => state.isShowingAdminControls)
  const isClubMode = useStore((state) => state.me.isClubMode)
  const setControls = useStore((state) => state.setIsShowingAdminControls)
  const updateMe = useStore((state) => state.updateMe)

  const handleBanSubmit = ({ name }) => {
    if (name !== "") {
      banPlayer({
        name,
      })
    }
  }

  const handleUnbanSubmit = ({ address }) => {
    if (address !== "") {
      unbanIP({
        address,
      })
    }
  }

  const handleLaunchClubMode = () => {
    updateMe({ isClubMode: true })
    setControls(false)
  }

  return (
    !isClubMode && (
      <UI onClick={(e) => e.stopPropagation()}>
        <h3 onClick={() => setControls(!isShowing)}>Admin Controls</h3>
        {isShowing && (
          <>
            <h4>Ban User</h4>
            <Formik onSubmit={handleBanSubmit} initialValues={{ name: "" }}>
              <Form>
                <TextField name="name" />
                <button type="submit">Go</button>
              </Form>
            </Formik>
            {banResponse && <strong>{banResponse}</strong>}

            <h4>Unban IP Address</h4>
            <Formik
              onSubmit={handleUnbanSubmit}
              initialValues={{ address: "" }}
            >
              <Form>
                <TextField name="address" />
                <button type="submit">Go</button>
              </Form>
            </Formik>
            {unbanResponse && <strong>{unbanResponse}</strong>}
            <button onClick={handleLaunchClubMode}>Launch club mode</button>
          </>
        )}
      </UI>
    )
  )
}
