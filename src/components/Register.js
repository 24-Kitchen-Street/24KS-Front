import { useStore } from "../store"
import styled from "styled-components"
import { registerPlayer } from "../socket"
import { useEffect, useMemo } from "react"
import { Formik, Form } from "formik"
import { TextField } from "./form/TextField"
import { ErrorMessage } from "./form/ErrorMessage"
import { Color } from "three"
import { OutlineContent } from "./OutlineContent"
import { Loading } from "./Loading"


const params = new URL(document.location).searchParams
const showPass = params.get("admin") === "1"
const tempColor = new Color()



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
  font-family: 'Libre Baskerville', serif;
`


const FieldGroup = styled.div`
  margin-top: 0.5rem;
  font-size: 20px;
  font-family: 'Libre Baskerville', serif;
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
  const isLoading = useStore((state) => state.isLoading);
  const setGamePlay = useStore((state) => state.setGamePlay)  
  const setIsLoading = useStore((state) => state.setIsLoading);
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  })

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
    <>
    {isLoading===true ?
      <Loading />
    :
      <Overlay>  
      <OutlineContent>
      <p>Welcome to Club Geist. What's your name? </p>
      </OutlineContent>
      <OutlineContent>
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
          <FieldGroup>
                Ready? Let's<Button onClick={() => setGamePlay(false)} type="submit">Go</Button>
            </FieldGroup>        
        </Form>
      </Formik>
      {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
      </OutlineContent>
    </Overlay>
      }
    </>
  )
}
