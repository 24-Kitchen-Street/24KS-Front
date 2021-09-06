import * as THREE from "three"

import { shaderMaterial } from "@react-three/drei"

import { Color } from "three"
import { liquid } from "../glsl/liquid"
import { defaultVert } from "../glsl/defaultVert"

export const LiquidMaterial = shaderMaterial(
   {time: 0.5 , resolution: new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2)},
  defaultVert,
  liquid
)
