import { useStore } from "../store"
import styled from "styled-components"
import { registerPlayer } from "../socket"
import { useEffect, useMemo } from "react"
import { Formik, Form } from "formik"
import { TextField } from "./form/TextField"
import { ErrorMessage } from "./form/ErrorMessage"
import { Color } from "three"
import { SHOW_ADMIN } from "../config"
import { playVideo } from "../utils/streamMaterial"
import { isTouchDevice } from "../utils/isTouchDevice"

const tempColor = new Color()

const Overlay = styled.div`
  font-family: 'HkGrotesk Light';
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 0, 0, 0) 50%
  );
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 3rem;
  flex-direction: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: white;
  z-index: 9999999999;

  button {
    margin-top: 1rem;
  }
`

const FieldGroup = styled.div`
  font-family: 'HkGrotesk Light';
  margin-top: 1rem;
  label {
    display: block;
  }
`

const Button = styled.button`
  font-family: 'HkGrotesk Light';
`

export function Register() {
  const me = useStore((state) => state.me)
  const setCurrentPopup = useStore((state) => state.setCurrentPopup)
  const registerError = useStore((state) => state.registerError)
  const skinPlayer = useStore((state) => state.skinPlayer)
  const updateSkinPlayer = useStore((state) => state.updateSkinPlayer)
  const hexColor = useMemo(
    () => `#${tempColor.setRGB(...skinPlayer.color).getHexString()}`,
    [skinPlayer.color]
  )

  useEffect(() => {
    if (me.isValid) {
      if (!isTouchDevice()) {
        setCurrentPopup("intro")
      } else {
        setCurrentPopup(null)
      }
    }
  }, [me, setCurrentPopup])

  const handleSubmit = ({ name, adminPassword }) => {
    if (name !== "") {
      registerPlayer({
        name,
        adminPassword,
        ...skinPlayer,
      })

      playVideo()
    }
  }

  return (
    <Overlay>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ name: "", adminPassword: "" }}
      >
        <Form>
          <label>Name</label>
          <TextField name="name" autoFocus />

          {SHOW_ADMIN && (
            <FieldGroup>
              <label htmlFor="adminPassword">Admin Pass</label>
              <TextField name="adminPassword" type="password" />
            </FieldGroup>
          )}

          {[
            ["wobbleSpeed", "Speed"],
            ["wobbleAmplitude", "Amplitude"],
            ["wobbleFrequency", "Frequency"],
          ].map(([id, name]) => (
            <FieldGroup key={id}>
              <label>{name}</label>
              <input
                type="range"
                id={id}
                name={id}
                step="0.01"
                min="0"
                max="1"
                value={skinPlayer[id]}
                onChange={({ target }) => {
                  const val = parseFloat(target.value)
                  updateSkinPlayer({ [id]: val })
                }}
              />
            </FieldGroup>
          ))}

          <FieldGroup>
            <label>Color</label>
            <input
              type="color"
              id="color"
              name="color"
              value={hexColor}
              onChange={({ target }) => {
                const val = tempColor.set(target.value).toArray()
                updateSkinPlayer({ color: val })
              }}
            />
          </FieldGroup>

          <Button type="submit">Enter the Club</Button>
        </Form>
      </Formik>
      {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
    </Overlay>
  )
}
