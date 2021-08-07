import { shaderMaterial } from "@react-three/drei"

import { Color } from "three"
import { shaderTest } from "../glsl/shaderTest"
import { defaultVert } from "../glsl/defaultVert"

let mouse = [0, 0];
const canvas = document.createElement("canvas");

export const ShaderTestMaterial = shaderMaterial(
  { u_time: 0, u_resolution: [canvas.width, canvas.height], u_mouse: mouse},
  defaultVert,
  shaderTest
)