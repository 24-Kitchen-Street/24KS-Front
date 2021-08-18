import { shaderMaterial } from "@react-three/drei"

import * as THREE from "three";
import { Color } from "three"
import { shaderTest } from "../glsl/shaderTest"
import { acid  } from "../glsl/acid"
import { defaultVert } from "../glsl/defaultVert"
import { waveVert } from "../glsl/waveVert"
import { twistVert } from "../glsl/twistVert"



const loader = new THREE.TextureLoader();
const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/bayer.png');

const shaders = [acid, shaderTest];


export const ShaderTestMaterial = shaderMaterial(
  {
    time: 0,
    u_mouse: {},
    u_color: new Color(0.2, 0.0, 0.1) 
  },
  defaultVert,
  shaderTest
)

