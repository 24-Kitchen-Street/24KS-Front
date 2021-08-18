import { shaderMaterial } from "@react-three/drei"

import * as THREE from "three";
import { Color } from "three"
import { shaderTest } from "../glsl/shaderTest"
import { defaultVert } from "../glsl/defaultVert"
import { waveVert } from "../glsl/waveVert"



const loader = new THREE.TextureLoader();
const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/bayer.png');




export const ShaderTestMaterial = shaderMaterial(
  {
    time: 0,
    u_mouse: {},
    u_color: new Color(0.2, 0.0, 0.1) 
  },
  defaultVert,
  shaderTest
)

