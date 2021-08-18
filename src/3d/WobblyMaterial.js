/* eslint-disable react/jsx-pascal-case */

import React, { useState } from "react"
import { ShaderChunk } from "three"
import ComponentMaterial from "component-material"
import { verttop } from "../glsl/verttop.glsl.js"
import { displaceBody } from "../glsl/displacebody.glsl.js"
import { useFrame } from "@react-three/fiber"

export const WobblyMaterial = ({ materialConfig, from }) => {
  const [time, setTime] = useState(0)

  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime())
  })

  return (
    <ComponentMaterial
      from={from}
      uniforms={{
        time: { value: time, type: "float" },
      }}
      {...materialConfig}
    >
      <ComponentMaterial.Vert.Head>{
        /* glsl */ `
    ${verttop}
  
    vec3 displace(vec3 point) {
      float amp = amplitude * (point.y * .5) * 1.;
      float t = time + point.x * 0.1 + point.y * 0.1;
      float sp = speed * 10.;
      float fq = frequency * 1.5;
      point.x += sin(point.y * fq + t * sp) * amp;
      point.z += cos(point.y * fq + t * sp) * amp;
      return point;
    }
      `
      }</ComponentMaterial.Vert.Head>
      <ComponentMaterial.Vert.uv_vertex children={displaceBody} />
      <ComponentMaterial.Vert.defaultnormal_vertex
        replaceChunk
        children={ShaderChunk.defaultnormal_vertex.replace(
          "vec3 transformedNormal = objectNormal;",
          `vec3 transformedNormal = displacedNormal;`
        )}
      />
      <ComponentMaterial.Vert.displacementmap_vertex
        replaceChunk
        children="transformed = displacedPosition;"
      />
    </ComponentMaterial>
  )
}
