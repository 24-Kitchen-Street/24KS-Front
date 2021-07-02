import { shaderMaterial } from "@react-three/drei"

import { Color } from "three"
import { acid } from "../glsl/acid"
import { defaultVert } from "../glsl/defaultVert"

export const AcidMaterial = shaderMaterial(
  { time: 0, color: new Color(0.2, 0.0, 0.1) },
  defaultVert,
  acid
)
