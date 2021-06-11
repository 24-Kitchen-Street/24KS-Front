import { Arena } from "./Arena"
import { Environment } from "@react-three/drei"
import { ShaderSphere } from "../3d/ShaderSphere"
import { Avatars } from "./Avatars"

export function World() {
  return (
    <>
      <Environment preset="sunset" />
      <Avatars />
      <ShaderSphere />
      <Arena />
    </>
  )
}
