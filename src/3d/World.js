import React, { Suspense, useState, useEffect } from "react";
import { useStore } from "../store"
import { Arena } from "./Arena"
import { Environment } from "@react-three/drei"
import { ShaderSphere } from "../3d/ShaderSphere"
import { Screen } from "./Screen";
import { Portal } from "./Portal";
import { Lines } from "./Lines";
import { ReflectiveShape } from "./ReflectiveShape";
import { Avatars } from "./Avatars";
import { AvatarUI } from "./AvatarUI";
import { ErrorScreen } from "../components/ErrorScreen";

export function World() {
  let currentPopup = useStore(state => state.currentPopup)

  if (currentPopup === "intro" || currentPopup === "register") {
    return (
      <>
      <Environment preset="sunset" />
      <AvatarUI />
      {/* How to get single ghosts in a line here ? */}
      <Portal /> 
    </> 
    )
  }
  else if (currentPopup === null){
    return (
      <>
        
        <Environment preset="sunset" />
        <Avatars />
        <Arena />
        {/* <Screen /> */}
        <ReflectiveShape />
      </>  
    )
  }
  else {
    return (
      <>
        <Environment preset="sunset" />
        <Avatars />
        <Arena />
        {/* <Screen /> */}
        <ReflectiveShape />
        <ErrorScreen />
      </>  
    )    
  }
}
