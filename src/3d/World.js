import React, { Suspense } from "react";
import { Arena } from "./Arena"
import { Environment } from "@react-three/drei"
import { ShaderSphere } from "../3d/ShaderSphere"
import { Screen } from "./Screen";
import { Lines } from "./Lines";
import { ReflectiveShape } from "./ReflectiveShape";
import { Avatars } from "./Avatars";

export function World() {
  return (
    <>
      <Environment preset="sunset" />
      <Avatars />
      <ShaderSphere />
      <Arena />
      {/* <Suspense fallback={null}>
      <ReflectiveShape />
      </Suspense> */}
      <Screen />
      
      {/* <Lines /> */}
    </>
  )
}
