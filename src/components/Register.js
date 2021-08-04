import { useStore } from "../store"
import styled from "styled-components"
import { registerPlayer } from "../socket"
import { useEffect, useMemo } from "react"
import { Formik, Form } from "formik"
import { TextField } from "./form/TextField"
import { ErrorMessage } from "./form/ErrorMessage"
import { Color } from "three"


const params = new URL(document.location).searchParams
const showPass = params.get("admin") === "1"
const tempColor = new Color()


const Shape = styled.div`

`

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


const CircularSb = styled.div`
    border: 5px solid #00bfb6;
    background-color: rgba(0, 0, 0, 0);
    margin: 70px auto;
    border-radius: 40%;
    padding: 2rem;
    text-align: center;
    font-size: 20px;
    font-weight: 90;
    font-family: arial;
    color: #00bfb6;
    left: 0;
`


const Column = styled.div`
  /* display: flex;
  flex-direction: row;
  width: 100%; */
`


const FieldGroup = styled.div`
  margin-top: 0.5rem;
  font-size: 20px;
  label {
    display: block;
  }
`
const Button = styled.button `
  background-color: transparent;
  border: none ;
  text-decoration: underline;
  text-align: center;
  color: red;
  padding: 1rem;
  cursor: pointer;
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
      setCurrentPopup("intro")
    }
  }, [me, setCurrentPopup])

  const handleSubmit = ({ name, adminPassword }) => {
    if (name !== "") {
      registerPlayer({
        name,
        adminPassword,
        ...skinPlayer,
      })
    }
  }

  return (
    <Overlay>  
      <CircularSb>
      <p>Welcome to Club Geist. What's your name? Write on the dotted line</p>
      </CircularSb>
      <CircularSb>
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
         <Column>
          <FieldGroup>
                Ready? Let's<Button type="submit">Go</Button>
            </FieldGroup> 
         </Column>         
        </Form>
      </Formik>
      {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
      </CircularSb>
    </Overlay>
  )
}
