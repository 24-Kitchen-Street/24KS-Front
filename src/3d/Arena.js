import React, { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { streamMaterial } from "../utils/streamMaterial"
import { AcidMaterial } from "./AcidMaterial"
import { ShaderTestMaterial } from "./ShaderTestMaterial"
import { useFrame } from "@react-three/fiber"
import { Box3, Vector3 } from "three"
import { LiquidMaterial } from "./LiquidMaterial"

const acidMat = new AcidMaterial()
const shaderMat = new ShaderTestMaterial()
const liquidMat = new LiquidMaterial()

const mats = [shaderMat, acidMat]
var max = mats.length;
// Arena bounds for collision detection
export const bounds = {
  dancefloor: new Box3().setFromCenterAndSize(
    new Vector3(0, 0, 0),
    new Vector3(220, 160, 310)
  ),
  corridor: new Box3().setFromCenterAndSize(
    new Vector3(0, 0, 320),
    new Vector3(90, 30, 330)
  ),
}

export function Arena(props) {
  const { nodes, scene } = useGLTF("/arena2.glb")

  useEffect(() => {
    const clubMat = nodes.structure.material
    const clubMatScale = 10
    clubMat.map.repeat.set(clubMatScale, clubMatScale)
    clubMat.roughnessMap.repeat.set(clubMatScale, clubMatScale)
    clubMat.roughness = 1
    clubMat.metalness = 0
    clubMat.normalMap.repeat.set(clubMatScale, clubMatScale)
    clubMat.metalnessMap.repeat.set(clubMatScale, clubMatScale)

    nodes.widescreen0.material = streamMaterial
    nodes.widescreen1.material = streamMaterial

    const numScreens = 19
    

    for (let i = 0; i < numScreens; i++) {
      
 
      if (i % 2 === 0) {
 
        nodes[`screen${i}`].material = liquidMat
      }
      else {

          nodes[`screen${i}`].material = shaderMat
       
      }
      
    }
  }, [nodes])

//   setInterval(function() {
//     for (let i = 0; i < max; i++) {
//       if (i < 1) {
//         nodes[`screen${i}`].material = shaderMat
//       } else {
//         nodes[`screen${i}`].material = acidMat
//       }
//     }
    
//   }, 3000)    
// }
       // setInterval(function() {
        //   for (let x = 0; x < max; x++) {
        //     // let variedMats = mats[x]
        //     nodes[`screen${i}`].material = shaderMat
        //   }
        // }, 20000)

  useFrame(({ clock }) => {
    shaderMat.time = clock.getElapsedTime()
    liquidMat.time = clock.getElapsedTime()
  })



  return (
    <>
      <primitive object={scene} scale={40} />

      {/* Uncomment this to see collison bounds of the arena */}
      {/* {Object.values(bounds).map((b) => (
        <box3Helper box={b} />
      ))} */}
    </>
  )
}

useGLTF.preload("/arena2.glb")
