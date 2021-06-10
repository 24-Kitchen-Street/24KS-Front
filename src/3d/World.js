import { Avatar } from "./Avatar"
import { Arena } from "./Arena"
import { useStore } from "../store"
import { useEffect, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { WobblyMaterial } from "./WobblyMaterial"
import { Color, MeshNormalMaterial } from "three"

export function World() {
  const players = useStore((state) => state.players)
  const me = useStore((state) => state.me)

  // We don't want to create a new material for every component
  // and because we're using component-material we need to do some weird
  // things to re-use the materials
  // https://github.com/pmndrs/component-material/pull/22
  const matARef = useRef()
  const [matA, setMatA] = useState()
  useEffect(() => void setMatA(matARef.current), [])

  const matBRef = useRef()
  const [matB, setMatB] = useState()
  useEffect(() => void setMatB(matBRef.current), [])

  useFrame(({ clock }) => {
    if (matA) matA.time = clock.getElapsedTime()
    if (matB) matB.time = clock.getElapsedTime()
  })

  useEffect(() => {
    if (matA) {
      matA.speed = 2
    }

    if (matB) {
      matB.speed = 5
      matB.wireframe = true
      matB.emissive = new Color(0xffffff)
    }
  }, [matA, matB])

  return (
    <>
      {/* Defining two different materials here, in the tree but not attached to any mesh yet */}
      <WobblyMaterial ref={matARef} from={MeshNormalMaterial} />
      <WobblyMaterial ref={matBRef} />
      {players.map(
        // show all players except ourselves, based on ID
        (props) =>
          props.id !== me.id && (
            <Avatar
              key={props.id}
              {...props}
              // Choose material based on if is a dummy or not
              material={props.isDummy ? matA : matB}
            />
          )
      )}

      <Arena />
    </>
  )
}
