import react, { useState} from "react"
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
import px2vw from "../utils/px2vw"


const params = new URL(document.location).searchParams
const showPass = params.get("admin") === "1"
const tempColor = new Color()



const Overlay = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  height: 100vh;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  color: #cf3820;
  z-index: 9999999999;
  font-family: 'Libre Baskerville', serif;
  overflow-y: scroll;


  p {
    font-size: 22px;
   }

   @media (max-height: 600px) {
    font-size: 15px;
  }
   @media (max-height: 500px) {
    font-size: 13px;

  }

  /* @media (min-width: 768px) {
    width: ${px2vw(320, 768)};
    min-height: ${px2vw(200, 768)};
    height: 100%;
  }

  @media (min-width: 1024px) {
    width: ${px2vw(500)};
    min-height: ${px2vw(300)};
    height: 100%;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  } */
`


const FieldGroup = styled.div`
  /* display: flex;
  flex-direction: column;
  margin-top: 1.0rem; */
  color: #fbedfe;
  background-color: #4f38e450;
  padding: 0px;
  justify-content: center;
  align-items: center;
  font-family: 'Libre Baskerville', serif;
  border: 1px solid rgba(255,255,255, 0.3);
  label {
    border-radius: 10px;
    display: block;
    padding: 1.0rem;

  }
  @media (min-width: 300px) {
    font-size: 18px;
    height: fit-content;

  }
  @media (min-height: 300px) {
    font-size: 18px;
    height: fit-content;

  }
  @media (max-height: 300px) {
    font-size: 15px;
    height: fit-content;

  }
  @media (min-width: 1024px) {
    font-size: 22px;
    height: fit-content;


  }
`
const Button = styled.button `
  background-color: transparent;
  border: none ;
  text-decoration: underline;
  text-align: center;
  color: white;
  padding: 1rem;
  font-family: 'Libre Baskerville', serif;
  cursor: pointer;
  @media (max-width: 772px) {
    font-size: 20px;
  }
`

const Text = styled.div `
  position: absolute;
  padding: 2rem;
  height: fit-content;
  width: 30%;
  font-size: 28px;
  color: #fbedfe;

  @media (max-height: 600px) {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 2.5rem;

  }
`

const Container = styled.div `

`

const WaveBox = styled.div `
    position: fixed;
    top: 0;
    transform: rotate(90deg); 
    left: 0;
`

const WaveOne = styled.div `
  position: absolute;
  opacity: .9;
  width: 1500;
  height: 1300px;
  margin-left: -150px;
  margin-top: -250px;
  border-radius: 43%;
  animation: rotate 7000ms infinite linear;
  opacity: .8;
  background: #593661;
  @keyframes rotate {
  from { transform: rotate(0deg); }
  from { transform: rotate(-360deg); }
}
`
const WaveTwo = styled.div `
  position: absolute;
  opacity: .4;
  width: 1500px;
  height: 1300px;
  margin-left: -150px;
  margin-top: -250px;
  border-radius: 43%;
  animation: rotate 7000ms infinite linear;
  opacity: .2;
  background: #0af;
@keyframes rotate {
  from { transform: rotate(0deg); }
  from { transform: rotate(360deg); }
}
`
const WaveThree = styled.div `
  position: absolute;
  opacity: .4;
  width: 1000px;
  height: 3000px;
  margin-left: -150px;
  margin-top: -250px;
  border-radius: 43%;
  animation: rotate 7000ms infinite linear;
  opacity: .2;
  background: #0af;
@keyframes rotate {
  from { transform: rotate(0deg); }
  from { transform: rotate(360deg); }
}
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
    }, 3500);
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
      <Container>
      <Text>Choose your name and character settings. </Text>
      </Container> 
      
     <OutlineContent>
      
     <WaveBox>
        <WaveOne>
          <WaveTwo>
            <WaveThree>

            </WaveThree>
          </WaveTwo>
        </WaveOne>
      </WaveBox> 

      <Formik
        onSubmit={handleSubmit}
        initialValues={{ name: "", adminPassword: "" }}
      >
        <Form>
      
      <FieldGroup>
      <label>Name</label>
      <TextField name="name" autoFocus />
      </FieldGroup>

      
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
        
               <Button onClick={() => setGamePlay(false)} type="submit">Enter</Button>
                  
        </Form>
      </Formik>
      {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
      </OutlineContent>
    </Overlay>
 
      }
    </>
  )
}
