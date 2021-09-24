import { shaderMaterial } from "@react-three/drei"
import { Color } from "three"
import { vibes } from "../glsl/vibes"
import { defaultVert } from "../glsl/defaultVert"

export const VibesMaterial = shaderMaterial(
  {
    time: 0,
    u_mouse: {},
    u_color: new Color(0.2, 0.0, 0.1),
  },
  defaultVert,
  vibes
)
